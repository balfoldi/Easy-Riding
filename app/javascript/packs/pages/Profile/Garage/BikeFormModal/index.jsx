import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Button, Form, Alert, Col } from "react-bootstrap";
import ModelAutocompleteInput from "./ModelAutocompleteInput";

const BikeFormModal = ({ toggle, modal }) => {
  const [input, setInput] = useState("");

  return (
    <div>
      <Modal isOpen={true/*modal*/} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Modèle</Form.Label>
            < ModelAutocompleteInput />
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
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
