import "./index.scss";
import React from "react";
import { Container, Button, Form, Col } from "react-bootstrap";
import authStore from "../../../stores/Auth";
import { observer } from "mobx-react";

const ProfileInfo = () => {
  const { user } = authStore;

  //const handleSubmit = () => {
  //  fetch(`/api/users/${user.id}`)
  //}

  return (
    <Container id="form-container">
      {console.log(user.id)}

      <p id="intro">Mon profil</p>

      <Form onSubmit="handleSubmit" >

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
