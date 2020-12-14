import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { Container, Button, Form, Alert, Col, Card } from "react-bootstrap";
import "./style.scss";

const ModelAutocompleteInput = ({ setSpec, masterInput, handleChildrenInputChange }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [specs, setSpecs] = useState([]);

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

  const getSuggestions = () => {
    const inputValue = input.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength > 1
      ? specs.filter((spec) => spec.model.toLowerCase().slice(0, inputLength) === inputValue)
      : [];
  };

  useEffect(() => {
    console.log(input);
    setSuggestions(getSuggestions(input, specs));
    console.log(suggestions);
  }, [input]);

  const autocomplete = (suggestion) => {
    setInput(suggestion.model)
    setSpec(suggestion);
    setSuggestions([]);
  };

  const handleInputChange = (event) => {
    console.log({[event.target.name]: event.target.value})
    console.log(masterInput)
    setInput(event.target.value);
    console.log(masterInput)
    handleChildrenInputChange(input)
  };

  return (
    <div>
      <Form.Control
        onChange={handleInputChange}
        name="model"
        type="text"
        placeholder="Honda CB500F"
        value={input}
      />
      <Card id="sugestions-container">
        {suggestions.map((suggestion) => (
          <Card.Title onClick={() => autocomplete(suggestion)}>
            {suggestion.model}
          </Card.Title>
        ))}
      </Card>
    </div>
  );
};
export default ModelAutocompleteInput;
