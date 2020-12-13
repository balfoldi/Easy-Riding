import "./index.scss";
import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";

const SearchBar = () => {
  return (
    <Row>
      <Col xs lg="2"></Col>
      <Col xs={9}>
        <Row>
          <Col xs={12} md={8}>
                <Form.Control size="lg" type="text" placeholder="Large text" />
            </Col>
            <Col xs={6} md={4}>
              <Button size="lg" variant="outline-dark">Search</Button>
            </Col>
        </Row>
      </Col>
      <Col xs lg="2"></Col>
    </Row>
  );
};

export default SearchBar;
