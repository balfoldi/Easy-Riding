import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import MyBikeList from "./MyBikeList"

const OfferFormModal = ({ toggle, modal, setModal, fetchMyBikes }) => {
  const [input, setInput] = useState({});
  const [alerts, setAlerts] = useState([]);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    if (modal) {
      setInput({});
      setAlerts([]);
    }
  }, [modal]);

  const postOffer = () => {
    console.log(input);
    fetch("/api/bikes", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .catch((error) => console.log(error))
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.errors) {
          setAlerts([{ variant: "success", message: "Moto Ajoutée" }]);
          setTimeout(() => {
            setModal(false);
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
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajouter ma moto</ModalHeader>
        <MyBikeList input={input} setInput={setInput}/>
        <ModalBody>
          <Form>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="titre"
                    placeholder="Une CB incoyable"
                    value={input.titre}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Label>Prix journalier</Form.Label>
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
              <Form.Label>La meilleur offre pour la meilleur moto</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="description"
                type="text"
                placeholder="Honda"
                value={input.description}
              />
            </Form.Group>
            <Row>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Région</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="region"
                    type="text-field"
                    placeholder="20500km"
                    value={input.region}
                  />
                </Form.Group>
              </Col>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Code postal</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="zip_code"
                    type="text"
                    placeholder="5,4 sec"
                    value={input.zip_code}
                  />
                </Form.Group>
              </Col>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="city"
                    type="text"
                    placeholder="471 m³"
                    value={input.city}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Rue</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="street"
                type="text"
                placeholder="Roadster"
                value={input.street}
              />
            </Form.Group>

            <Col sm="6">
              <Form.Group>
                <Form.Label>Le couple</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="maximum_torque"
                  type="text"
                  placeholder="43 Nm à 6 500 tr/min"
                  value={input.maximum_torque}
                />
              </Form.Group>
            </Col>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Row>
            {alerts.map((alert) => (
              <Alert key={alerts.indexOf(alert)} variant={alert.variant}>
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
export default OfferFormModal;
