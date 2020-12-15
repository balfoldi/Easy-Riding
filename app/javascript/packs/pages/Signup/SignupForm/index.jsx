import "./index.scss";
import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import authStore from '../../../stores/Auth';
import { useHistory } from "react-router-dom";
import { Container, Button, Form, Alert, Col } from "react-bootstrap";

const SignupForm = () => {
  const { signup, error, isLogged } = authStore;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;
    const termsAccepted = e.target.termsAccepted.checked;
    signup(email, password, passwordConfirmation, termsAccepted);
  };

  useEffect(() => {
    if (isLogged) {
      history.push('/');
    }
  }, [isLogged]);

  return (
    <Container id="form-container">

      <p id="intro">Bienvenue à bord !</p>
      <p id="second">Remplissez ces champs pour vous inscrire :</p>

      {/* {error && error.map((e) => {
        console.log(e)})
      } */}
      {/* {error && <Alert variant="warning">{error}</Alert>} */}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Votre adresse email</Form.Label>
          <Form.Control
            name="email" type="email" placeholder="Entrez une adresse email valide" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              name="password" type="password" placeholder="Choisissez un mot de passe" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              name="passwordConfirmation" type="password" placeholder="Confirmez votre mot de passe" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Check name="termsAccepted" type="checkbox"></Form.Check>
          <Form.Label>J'accepte les <a href="#">Conditions Générales d'Utilisation</a></Form.Label>
        </Form.Row>

        <Form.Text className="text-muted">
          Nous ne partagerons jamais vos informations personnelles avec d'autres services.
        </Form.Text>

        <Button
          id="button"
          variant="primary"
          type="submit">
          Inscription
        </Button>
      </Form>

    </Container>
  );
};

export default observer(SignupForm);
