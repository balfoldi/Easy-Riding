import './index.scss';
import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import authStore from '../../../stores/Auth';
import { useHistory } from 'react-router-dom';
import { Container, Button, Form, Alert } from "react-bootstrap";


const LoginForm = () => {
  const { login, error, isLogged } = authStore;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password);
  };

  useEffect(() => {
    if (isLogged) {
      history.push('/');
    }
  }, [isLogged]);

  return (
    <Container id="form-container">

      <p id="intro">Ravis de vous retrouver !</p>

      {error && <Alert variant="warning">{error}</Alert>}

      <Form onSubmit={handleSubmit} >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Votre email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Votre mot de passe"
          />
        </Form.Group>

        <Button
          id="button"
          type="submit">
          Se connecter
        </Button>
      </Form>

    </Container>
  )
}

export default observer(LoginForm);
