import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const BookingModal = ({ toggle, modal, offer, fetchMyOffers }) => {
  const [input, setInput] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegionChange = (event) => {
    setInput({
      ...input,
      region: event.target.value,
    });
  };

  useEffect(() => {
    if (offer) {
      setInput({
        offer_id: offer.id
      });
      setStartDate(new Date(offer.start_date));
      setEndDate(new Date(offer.end_date));
    }
  }, [offer]);

  const postOffer = () => {

    fetch(`/api/bookings`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ booking: {
        ...input,
        start_date: startDate.toJSON(),
        end_date: endDate.toJSON(),
      }}),
    })
      .catch((error) => console.log(error))
      .then((response) => response.json())
      .then((response) => {
        if (!response.errors) {
          setAlerts([
            { variant: "success", message: "Demande Envoyée"},
          ]);
          setTimeout(() => {
            toggle();
            setAlerts([]);
          }, 1000);
        } else {
          setAlerts(
            response.errors.map((error) => {
              return { variant: "warning", message: error.detail };
            })
          );
        }
      });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Envoyer une demande de réservation</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <label>Début de la location</label>
                  <Calendar
                    minDate={new Date(offer.start_date)}
                    maxDate={new Date(offer.end_date)}
                    className="mr-auto ml-auto"
                    onChange={setStartDate}
                    value={startDate}
                  />
                </Form.Group>
                <Form.Group>
                  <label>Fin de la location</label>
                  <Calendar
                    minDate={startDate}
                    maxDate={new Date(offer.end_date)}
                    className="mr-auto ml-auto"
                    onChange={setEndDate}
                    value={endDate}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <p>Prix de la location :{offer.daily_price + offer.daily_price * ((endDate - startDate)/86400000)}</p>
        </ModalBody>

        <ModalFooter>
          <Row>
            {alerts.map((alert, idx) => (
              <Alert key={idx} variant={alert.variant}>
                {alert.message}
              </Alert>
            ))}
          </Row>
          <Button variant="primary" onClick={postOffer}>
            Envoyer
          </Button>
          <Button variant="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default BookingModal;
