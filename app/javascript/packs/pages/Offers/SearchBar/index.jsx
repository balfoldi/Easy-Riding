import "./index.scss";
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";

const SearchBar = ({ offers, input, setInput }) => {
  const [SearchAttributes, setSearchAttributes] = useState({
    regions: [
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Bretagne",
      "Centre-Val de Loire",
      "Corse",
      "Grand Est",
      "Hauts-de-France",
      "Île-de-France",
      "Normandie",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Pays de la Loire",
      "Provence-Alpes-Côte d'Azur",
    ],
  });

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const fetchSearchAttributes = () => {
    fetch("/api/specs.1")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSearchAttributes({
          ...SearchAttributes,
          bodyTypes: response.body_types,
          companyNames: response.company_names,
        });
      });
  };

  useEffect(() => {
    fetchSearchAttributes();
  }, []);

  useEffect(() => {
    console.log(SearchAttributes);
  }, [SearchAttributes]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <Container>
      <Form>
        <Form.Group >
          <Form.Label>Modèle</Form.Label>
          <Form.Control
            name="model"
            size="lg"
            type="text"
            placeholder="Model"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row>
          <Col sm={4}>
            <Form.Group >
              <Form.Label>Région</Form.Label>
              <Form.Control
                name="region"
                as="select"
                onChange={handleInputChange}
                value={input.region}
              >
                <option value="all" >Toutes</option>
                {SearchAttributes.regions?.map((region, idx) => (
                  <option value={region} key={idx}>
                    {region}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group >
              <Form.Label>Catégorie</Form.Label>
              <Form.Control name="bodyType" as="select" onChange={handleInputChange}>
              <option value="all" >Toutes</option>
                {SearchAttributes.bodyTypes?.map((bodyType, idx) => (
                  <option value={bodyType} key={idx}>
                    {bodyType}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group >
              <Form.Label>Marque</Form.Label>
              <Form.Control name="companyName" as="select" onChange={handleInputChange}>
              <option value="all" >Toutes</option>
                {SearchAttributes.companyNames?.map((companyName, idx) => (
                  <option value={companyName} key={idx}>
                    {companyName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchBar;
