import './index.scss';
import React from "react";
import { Container, Button, Form } from "react-bootstrap";


const LoginForm = () => {
  return (
    <Container id="form-container">
      {/* {errors.map((error) => (
      <Alert variant="warning">{error.detail}</Alert>
      ))} */}
      <p id="intro">Ravis de vous retrouver !</p>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="username"
            type="username"
            placeholder="Votre pseudonyme"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            //onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Votre mot de passe"
          />
        </Form.Group>
        </Form>

      <Button //onClick={clickFetch}
      id="button" type="submit">
        Se connecter
      </Button>
    </Container>
  )
}

export default LoginForm;
