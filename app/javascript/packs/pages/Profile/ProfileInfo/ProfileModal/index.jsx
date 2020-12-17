import "./index.scss";
import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Form, Col, Alert } from "react-bootstrap";

const ProfileModal = (props) => {
  const [updateAlerts, setUpdateAlerts] = useState([]);
  const [input, setInput] = useState({});
  const user = props.user;

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    setInput(props.userData);
  }, [props.userData])

  const handleClose = () => {
    props.loadProfile()
    props.setShow(false);
    setUpdateAlerts([]);
  }

  const updateProfile = () => {
    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.userToken}`
      },
      body: JSON.stringify({ user: input })
    })
      .catch((error) => console.error(error))
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setUpdateAlerts(data.errors.map((error) => (
            {
              variant: "warning",
              message: error.detail
            }
          )));
        } else {
          setUpdateAlerts([{
            variant: "success",
            message: "Enregistrement..."
          }]);
          setTimeout(() => {
            handleClose();
          }, 1000);
        }
      })
  }

  return (
    <Modal id="form-container" size="lg" show={props.show} onHide={handleClose}>
      <p id="form-title">Modifier mon profil</p>

      {updateAlerts.map((alert, idx) => (
        <Alert key={idx} variant={alert.variant}>
          {alert.message}
        </Alert>
      ))}

      <Container id="modal-content">
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
          onClick={updateProfile}
          variant="outline-dark"
          type="submit">
          Enregistrer
        </Button>
      </Container>
    </Modal>
  )
}

export default ProfileModal;
