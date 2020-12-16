import "./index.scss";
import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Alert } from "react-bootstrap";
import authStore from "../../../stores/Auth";
import { observer } from "mobx-react";
import Cookies from "js-cookie";

const ProfileInfo = () => {
  const { user } = authStore;
  const userToken = Cookies.get("EasyRiderUserToken");
  const [input, setInput] = useState({});
  const [fetchErrors, setFetchErrors] = useState([]);

  //TO-DO : Remplacer users/ID par user.id

  const loadProfile = () => {
    fetch(`/api/users/1`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setInput(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    loadProfile();
  }, [])

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  const editProfile = () => {
    fetch(`/api/users/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ user: input })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setFetchErrors(() => data.errors);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Container id="form-container">
      <p id="intro">Mon profil</p>

      {fetchErrors.length > 0 && fetchErrors.map((error) => {
        return <Alert key={error.detail} variant="warning">{error.detail}</Alert>
      })}

      <Form>

        <Form.Group>
          <Form.Label>Pseudonyme</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={input.username || ''}
            name="username"
            type="text"
            placeholder=""
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={input.first_name || ''}
            name="first_name"
            type="text"
            placeholder=""
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={input.last_name || ''}
            name="last_name"
            type="text"
            placeholder=""
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={input.description || ''}
            name="description"
            as="textarea"
            rows={3}
            placeholder="Présentez-vous en quelques mots..."
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Votre adresse email</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.email || ''}
              name="email"
              type="email"
              placeholder=""
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.phone_number || ''}
              name="phone_number"
              type="text"
              placeholder=""
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Changer de mot de passe ?</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.password || ''}
              name="password"
              type="password"
              placeholder="Choisissez un mot de passe"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.passwordConfirmation || ''}
              name="passwordConfirmation"
              type="password"
              placeholder="Confirmez votre mot de passe"
            />
          </Form.Group>
        </Form.Row>

      </Form>

      <Button
        onClick={editProfile}
        id="button"
        variant="primary"
        type="submit">
        Valider
      </Button>

    </Container>
  )
}
export default observer(ProfileInfo);
