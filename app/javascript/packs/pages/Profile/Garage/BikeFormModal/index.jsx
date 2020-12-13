import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Button, Form, Alert, Col } from "react-bootstrap";
import ModelAutocompleteInput from "./ModelAutocompleteInput";
import Cookies from "js-cookie"

const BikeFormModal = ({ toggle, modal }) => {
  const [input, setInput] = useState({
    spec: {
      body_type: "",
      maximum_power: "",
      maximum_torque: "",
      zero_to_100: "",
    },
  });
  const [spec, setSpec] = useState([]);

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
    setInput({
      ...input,
      ...spec,
    });
    console.log(spec);
  }, [spec]);

  const postBike = () => {
    console.log("fetchUser()");
    console.log(input);
    fetch("/api/bikes", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        for (var pair of response.headers.entries()) {
          if (pair[0] === "authorization") {
            Cookies.set("token", pair[1]);
          }
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        console.log(Cookies.get("token"));
        if (!response.errors) {
          //console.log(response.errors)
          setErrors([]);
          Cookies.set("currentUser", JSON.stringify(response))
          store.setCurrentUser(response);
        } else {
          console.log("setErrors");
          setErrors(response.errors);
        }
        console.log("store is");
        console.log(store.currentUser);
      });
  };

  return (
    <div>
      <Modal isOpen={true /*modal*/} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>

        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="description"
                placeholder="Bonne état, a surtout été entreposé dans un garage"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Kilométrage</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="kilometrage"
                type="text-field"
                placeholder="20.500 km"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Modèle</Form.Label>
              <ModelAutocompleteInput setSpec={setSpec} setMasterInput={setInput} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Marque</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="compagny_name"
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
              <Form.Label>Torque maximum</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="maximum_torque"
                type="text"
                placeholder="43 Nm à 6 500 tr/min"
                value={input.maximum_torque}
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
          <Button color="primary" onClick={()=>console.log(input)}>
            Envoyer
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default BikeFormModal;
