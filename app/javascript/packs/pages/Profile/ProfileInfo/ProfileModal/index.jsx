import "./index.scss";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Container, Form, Col, Alert } from "react-bootstrap";
import Cookies from "js-cookie";

const ProfileModal = ({ userID, userData, isShown, setIsShown, onSaved }) => {
  const [updateAlerts, setUpdateAlerts] = useState([]);
  const [input, setInput] = useState({});
  const [preview, setPreview] = useState(null)

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0]
    setPreview(URL.createObjectURL(image))
    setInput({
      ...input,
      avatar: image,
    });
  };

  useEffect(() => {
    setInput(userData);
  }, [userData]);

  const handleClose = () => {
    onSaved();
    setIsShown(false);
    setUpdateAlerts([]);
  };

  const updateProfile = () => {
    const userToken = Cookies.get("EasyRidingUserToken");

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(`${key}`, input[key]);
    });

    fetch(`/api/users/${userID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    })
      .catch((error) => console.error(error))
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setUpdateAlerts(
            data.errors.map((error) => ({
              variant: "warning",
              message: error.detail,
            }))
          );
        } else {
          setUpdateAlerts([
            {
              variant: "success",
              message: "Enregistrement...",
            },
          ]);
          setTimeout(() => {
            handleClose();
          }, 1000);
        }
      });
  };

  return (
    <Modal id="form-container" size="lg" show={isShown} onHide={handleClose}>
      <p id="form-title">Modifier mon profil</p>

      {updateAlerts.map((alert, idx) => (
        <Alert key={idx} variant={alert.variant}>
          {alert.message}
        </Alert>
      ))}

      <Container id="modal-content">
      <Card.Img id="img-circle" variant="top"   src={preview ? preview :userData.avatar} />

        <Form>
          <Form.Group>
            <Form.File
              name="avatar"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleImageChange}
              label="Avatar"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Pseudonyme</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.username || ""}
              name="username"
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.first_name || ""}
              name="first_name"
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.last_name || ""}
              name="last_name"
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={input.description || ""}
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
                value={input.email || ""}
                name="email"
                type="email"
                placeholder=""
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={input.phone_number || ""}
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
                value={input.password || ""}
                name="password"
                type="password"
                placeholder="Choisissez un mot de passe"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Confirmation du mot de passe</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={input.passwordConfirmation || ""}
                name="passwordConfirmation"
                type="password"
                placeholder="Confirmez votre mot de passe"
              />
            </Form.Group>
          </Form.Row>
        </Form>

        <Button onClick={updateProfile} variant="outline-dark" type="submit">
          Enregistrer
        </Button>
      </Container>
    </Modal>
  );
};

export default ProfileModal;
