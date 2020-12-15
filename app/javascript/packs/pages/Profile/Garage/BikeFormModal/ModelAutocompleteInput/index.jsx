import "./style.scss";
import React, { useEffect, useState } from "react";
import { Form, Card } from "react-bootstrap";

const ModelAutocompleteInput = ({ modal, setSpec, handleChildrenInputChange }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [specs, setSpecs] = useState([]);

  const fetchSpecs = () => {
    fetch("/api/specs")
      .then((response) => response.json())
      .then((response) => {
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

  useEffect(()=>{
    if(modal){
      setInput('')
    }
  },[modal])

  useEffect(() => {
    setSuggestions(getSuggestions(input, specs));
    handleChildrenInputChange(input)
  }, [input]);

  const autocomplete = (suggestion) => {
    setInput(suggestion.model)
    setSpec(suggestion);
    setSuggestions([]);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
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
          <Card.Title key={suggestions.indexOf(suggestion)} onClick={() => autocomplete(suggestion)}>
            {suggestion.model}
          </Card.Title>
        ))}
      </Card>
    </div>
  );
};
export default ModelAutocompleteInput;
