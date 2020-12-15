import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import MyBikeList from "./MyBikeList";

const OfferFormModal = ({ toggle, modal, fetchMyBikes }) => {
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
    fetch("/api/offers", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({offer: input}),
    })
      .catch((error) => console.log(error))
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.errors) {
          setAlerts([{ variant: "success", message: "Moto Ajoutée" }]);
          setTimeout(() => {
            toggle()
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
        <ModalHeader toggle={toggle}>Créer une offre</ModalHeader>
        <ModalBody>
          <Form>
            <MyBikeList input={input} setInput={setInput} />
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
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Région</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="region"
                    type="text-field"
                    placeholder="île-de-France"
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
                    placeholder="91000"
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
                    placeholder="Yvries"
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
                placeholder="33 rue des alpageurs"
                value={input.street}
              />
            </Form.Group>

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
