import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Button, Form, Alert, Col } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

const BikeFormModal = ({ toggle, modal }) => {
  const [input, setInput] = useState("");
  const [specs, setSpecs] = useState([]);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : specs.filter((spec) => spec.model.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.model;

  const renderSuggestion = (suggestion) => <div>{suggestion.model}</div>;

  const fetchSpecs = () => {
    fetch("/api/specs")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSpecs(response);
      });
  };

  useEffect(() => {
    fetchSpecs();
  }, []);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "ex: Honda CB500F",
    value,
    onChange: onChange,
    className: "form-control"
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Modèle</Form.Label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />{" "}
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
