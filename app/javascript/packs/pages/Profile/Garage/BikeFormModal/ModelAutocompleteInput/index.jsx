import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import './style.scss'
const ModelAutocompleteInput = () => {
  const [value, setValue] = useState("h" /*""*/);
  const [suggestions, setSuggestions] = useState(["h"]);
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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : specs.filter((spec) => spec.model.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.model;

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div  {...containerProps}>
        <div class="overflow-auto" style={{"height:": "300px"}}>
          {children}
        </div>
      </div>
    );
  };

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

  const inputProps = {
    placeholder: "ex: Honda CB500F",
    value,
    onChange: onChange,
    className: "form-control",
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};
export default ModelAutocompleteInput;
