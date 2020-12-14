import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, Alert } from "react-bootstrap";
import ModelAutocompleteInput from "./ModelAutocompleteInput";
import Cookies from "js-cookie";

const BikeFormModal = ({ toggle, modal, setModal, fetchMyBikes }) => {
  const [input, setInput] = useState({});
  const [spec, setSpec] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleChildrenInputChange = (content) => {
    setInput({
      ...input,
      model: content,
    });
  };

  useEffect(() => {
    console.log(input)
  }, [input]);

  useEffect(() => {
    setInput({
      ...input,
      ...spec,
    });
  }, [spec]);

  useEffect(()=>{
    if(modal){
      setInput({})
    }
  },[modal])

  const postBike = () => {
    fetch("/api/bikes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}`,
      },
      body: JSON.stringify({ bike: input }),
    })
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
          {alerts.map((alert) => (
            <Alert key={alerts.indexOf(alert)} variant={alert.variant}>{alert.message}</Alert>
          ))}
          <Form>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="description"
                placeholder="Bon état, la moto a toujours dormi au sec."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Kilométrage</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="kilometrage"
                type="text-field"
                placeholder="20500 km"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Modèle</Form.Label>
              <ModelAutocompleteInput
                masterInput={input}
                setSpec={setSpec}
                handleChildrenInputChange={handleChildrenInputChange}
                modal={modal}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Marque</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="company_name"
                type="text"
                placeholder="Honda"
                value={input.company_name}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="body_type"
                type="text"
                placeholder="Roadster"
                value={input.body_type}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Puissance maximum</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="maximum_power"
                type="text"
                placeholder="35 kW à 8 600 tr/min"
                value={input.maximum_power}
              />
            </Form.Group>

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

            <Form.Group>
              <Form.Label>La cylindrée</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="displacement"
                type="text"
                placeholder="471 m³"
                value={input.displacement}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Zéro à 100</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="zero_to_100"
                type="text"
                placeholder="5,4 seconds"
                value={input.zero_to_100}
              />
            </Form.Group>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={postBike}>
            Envoyer
          </Button>
          <Button color="Annuler" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default BikeFormModal;
