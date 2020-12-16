import "./index.scss";
import React, { useState } from "react";
import { Container, Button, Form, Col, Alert } from "react-bootstrap";
import authStore from "../../../stores/Auth";
import { observer } from "mobx-react";
import Cookies from "js-cookie";

const ProfileInfo = () => {
  const [fetchErrors, setFetchErrors] = useState([]);
  const { user } = authStore;
  const userToken = Cookies.get("EasyRiderUserToken");


  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      user: {
        username: e.target.username.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        description: e.target.description.value,
        email: e.target.email.value,
        phone_number: e.target.phone_number.value
      }
    }

    fetch(`/api/users/10`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        setFetchErrors(data.errors);
      }
    })
    .catch((error) => console.error(error));
  }

  return (
    <Container id="form-container">
      <p id="intro">Mon profil</p>

      {fetchErrors.length > 0 && fetchErrors.map((error) => {
        <Alert variant="warning">{error.detail}</Alert>
      })}

      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Pseudonyme</Form.Label>
          <Form.Control
            name="username" type="text" placeholder="" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            name="first_name" type="text" placeholder="" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            name="last_name" type="text" placeholder="" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description" as="textarea" rows={3} placeholder="Présentez-vous en quelques mots..." />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Votre adresse email</Form.Label>
            <Form.Control
              name="email" type="email" placeholder="" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              name="phone_number" type="text" placeholder="" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Changer de mot de passe ?</Form.Label>
            <Form.Control
              name="password" type="password" placeholder="Choisissez un mot de passe" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              name="passwordConfirmation" type="password" placeholder="Confirmez votre mot de passe" />
          </Form.Group>
        </Form.Row>

        <Button
          id="button"
          variant="primary"
          type="submit">
          Valider
        </Button>
      </Form>

    </Container>
  )
}
export default observer(ProfileInfo);
