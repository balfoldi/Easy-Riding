import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button, Form, Alert } from "react-bootstrap";
import Cookies from "js-cookie";
import PictureInput from "./PicturesInput";

const BikeFormModal = ({ toggle, modal, setModal, fetchMyBikes }) => {
  const [input, setInput] = useState({});

  const [alerts, setAlerts] = useState([]);
  const [pictures, setPictures] = useState([]);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (modal) {
      setInput({});
      setAlerts([]);
      setPictures([]);
    }
  }, [modal]);

  const postBike = () => {
    if (Object.keys(input).length === 0) {
      return;
    }
    const formData = new FormData();

    Object.keys(input).forEach((key) => {
      formData.append(`${key}`, input[key]);
    });

    pictures.forEach((picture) => {
      formData.append("pictures[]", picture);
    });

    fetch("/api/bikes", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}`,
      },
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => response.json())
      .then((response) => {
        if (!response.errors) {
          setAlerts([{ variant: "success", message: "Moto Ajoutée" }]);
          fetchMyBikes();
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajouter ma moto</ModalHeader>

        <ModalBody>
          <Form>
            <PictureInput pictures={pictures} setPictures={setPictures} />

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="description"
                placeholder="Bon état, la moto a toujours dormi au sec."
                value={input.description || ""}
              />
            </Form.Group>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="model"
                    type="text"
                    placeholder="CB 500"
                    value={input.model || ""}
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="company_name"
                    type="text"
                    placeholder="Honda"
                    value={input.company_name || ""}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Kilométrage</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="kilometrage"
                    type="text"
                    placeholder="20500km"
                    value={input.kilometrage || ""}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Zéro à 100</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="zero_to_100"
                    type="text"
                    placeholder="5,4 sec"
                    value={input.zero_to_100 || ""}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="body_type"
                    type="text"
                    placeholder="Roadster"
                    value={input.body_type || ""}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>La cylindrée</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="displacement"
                    type="text"
                    placeholder="471 m³"
                    value={input.displacement || ""}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Puissance maximum</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="maximum_power"
                    type="text"
                    placeholder="35 kW à 8 600 tr/min"
                    value={input.maximum_power || ""}
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Le couple</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="maximum_torque"
                    type="text"
                    placeholder="43 Nm à 6 500 tr/min"
                    value={input.maximum_torque || ""}
                  />
                </Form.Group>
              </Col>
            </Row>
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
          <Button variant="primary" onClick={postBike}>
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
export default BikeFormModal;
