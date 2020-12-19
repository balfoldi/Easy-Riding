import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import MyBikeList from "./MyBikeList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DeleteButton from "../../../../components/Buttons/DeleteButton"

const OfferFormModal = ({ toggle, modal, offer, fetchMyOffers, bike }) => {
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

  useEffect(()=>{
    setInput({
      ...input,
      bike_id: bike?.id
    })
  },[bike])

  useEffect(() => {
    if (offer) {
      setInput(offer);
      setStartDate(new Date(offer.start_date));
      setEndDate(new Date(offer.end_date));
    }
  }, [offer]);

  const postOffer = () => {

    fetch(`/api/offers${offer ? `/${offer.id}` : ""}`, {
      method: offer ? `PATCH` : "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offer: {
        ...input,
        start_date: startDate.toJSON(),
        end_date: endDate.toJSON()
      } }),
    })
      .catch((error) => console.log(error))
      .then((response) => response.json())
      .then((response) => {
        if (!response.errors) {
          setAlerts([
            { variant: "success", message: offer ? "Annonce mise à jour" : "Annonce Ajoutée" },
          ]);
          fetchMyOffers();
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
  const regions = [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
  ];

  const afterDelete = () => {
    setAlerts([
      { variant: "danger", message: "Annonce effacée" },
    ]);
    fetchMyOffers();
    setTimeout(() => {
      toggle();
      setAlerts([]);
    }, 1000);
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Créer une offre</ModalHeader>
        <ModalBody>
          <Form>
            {bike ? (
              <Form.Control type="text" placeholder={bike.model} readOnly />
            ):(
              offer ? (
                <Form.Control type="text" placeholder={offer.bike.model} readOnly />
              ) : (
                <MyBikeList input={input} setInput={setInput} />
              )
            )}

            <Row>
              <Col sm="9">
                <Form.Group>
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Une CB incoyable"
                    value={input.title}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Label>Prix au jour</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={handleInputChange}
                    name="daily_price"
                    placeholder="120"
                    value={input.daily_price}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Présentation</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="description"
                type="text"
                placeholder="Vennez essayer ma super meul et arsouiller ses cales pieds sur les routes de pars chez moi."
                value={input.description}
              />
            </Form.Group>
            <Row>
              <Col sm="8">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Choisir une Région</Form.Label>
                  <Form.Control as="select" onChange={handleRegionChange} value={input.region}>
                    {regions.map((region, idx) => (
                      <option value={region} key={idx}>
                        {region}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Code postal</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="zip_code"
                    type="text"
                    placeholder="91000"
                    value={input.zip_code}
                  />
                </Form.Group>
              </Col>
            </Row>
                <Row>
            <Col sm="4">
              <Form.Group>
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="city"
                  type="text"
                  placeholder="Yvries"
                  value={input.city}
                />
              </Form.Group>
            </Col>
            <Col sm="8">
              <Form.Group>
                <Form.Label>Rue</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="street"
                  type="text"
                  placeholder="33 rue des alpageurs"
                  value={input.street}
                />
              </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label>Début de disponibilités</label>
                  <Calendar
                    minDate={new Date()}
                    className="mr-auto ml-auto"
                    onChange={setStartDate}
                    value={startDate}
                  />
                </Form.Group>
                <Form.Group>
                  <label>Fin de disponibilités</label>
                  <Calendar
                    minDate={startDate}
                    className="mr-auto ml-auto"
                    onChange={setEndDate}
                    value={endDate}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
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
          {offer && <DeleteButton target={"offers"} id={offer.id} callback={afterDelete} />}
          <Button variant="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default OfferFormModal;
