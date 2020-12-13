import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const ModelAutocomplete = ({ specs }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : specs.filter((spec) => spec.model.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.model;

  const renderSuggestion = (suggestion) => <div>{suggestion.model}</div>;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <div>
      {suggestion}
      <Form.Control onChange={} name="last_name" type="text" placeholder="Last name" />
    </div>
  );
};
export default ModelAutocomplete;
