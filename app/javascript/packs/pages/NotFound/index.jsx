import './index.scss';
import { Link } from "react-router-dom";
import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container id="form-container">
      <p id="intro">Erreur 404, il n'y a rien par ici {'\u00a0'}...</p>
    <Row >
      <Col></Col>
        <Col xs={6}>
          <Link to="/">
          <Button> Retour à la page d'accueil</Button>
          </Link>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
};

export default NotFound;
