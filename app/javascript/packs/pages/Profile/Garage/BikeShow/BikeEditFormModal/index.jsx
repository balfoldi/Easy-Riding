import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button, Form, Alert } from "react-bootstrap";
import Cookies from "js-cookie";
import PictureInput from "./PicturesInput";
import DeleteButton from "../../../../../components/Buttons/DeleteButton"

const BikeEditFormModal = ({ toggle, modal, setModal, fetchMyBike, bike, fetchMyBikes }) => {
  const [input, setInput] = useState({test:2});
  const [spec, setSpec] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [newPictures, setNewPictures] = useState([]);
  const [currentPictures, setCurrentPictures] = useState([]);


  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setInput({
      ...input,
      description: bike.description ? bike.description : "" ,
      kilometrage: bike.kilometrage ? bike.kilometrage : "" ,
      model: bike.model ? bike.model : "" ,
      company_name: bike.company_name ? bike.company_name : "" ,
      body_type: bike.body_type ? bike.body_type : "" ,
      maximum_power: bike.maximum_power ? bike.maximum_power : "" ,
      maximum_torque: bike.maximum_torque ? bike.maximum_torque : "" ,
      zero_to_100: bike.zero_to_100 ? bike.zero_to_100 : "" ,
      displacement: bike.displacement ? bike.displacement : "" ,
    });
    setCurrentPictures(
      bike.pictures?.map((picture) => {
        picture.kill = false
        return picture
      })
    );
  }, [modal]);

  useEffect(() => {
    setInput({
      ...input,
      ...spec,
    });
  }, [spec]);

  useEffect(() => {
    if (modal) {
      setAlerts([]);
      setNewPictures([]);
    }
  }, [modal]);

  const postBike = () => {
    if (Object.keys(input).length === 0) {
      return;
    }
    const formData = new FormData();

    Object.keys(input).forEach((key) => {
      formData.append(`${key}`, input[key]);
    });

    newPictures.forEach((newPicture) => {
      formData.append("new_pictures[]", newPicture);
    });

    currentPictures.forEach((currentPicture) => {
      formData.append("current_pictures[]", [currentPicture.id, currentPicture.kill]);
    });
    fetch(`/api/bikes/${bike.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.errors) {
          setAlerts([{ variant: "success", message: "Moto mise à joure" }]);
          fetchMyBike();
          setTimeout(() => {
            setModal(false);
            setAlerts([]);
          }, 1000);
        } else {
          setAlerts(
            response.errors.map((error) => {
              return { variant: "warning", message: error.detail };
            })
          );
        }
      });
  };

  const afterDelete = () => {
    setAlerts([{ variant: "danger", message: "Moto effacée" }]);
    setTimeout(() => {
      setModal(false);
      setAlerts([]);
      fetchMyBikes()
    }, 1000);
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Éditer ma moto</ModalHeader>

        <ModalBody>
          <Form>
            <PictureInput
              currentPictures={currentPictures}
              setCurrentPictures={setCurrentPictures}
              newPictures={newPictures}
              setNewPictures={setNewPictures}
              bike={bike}
            />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="description"
                placeholder="Bon état, la moto a toujours dormi au sec."
                value={input.description}
              />
            </Form.Group>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="model"
                    type="text"
                    placeholder="Honda"
                    value={input.model}
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="company_name"
                    type="text"
                    placeholder="Honda"
                    value={input.company_name}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Kilométrage</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="kilometrage"
                    type="text-field"
                    placeholder="20500km"
                    value={input.kilometrage}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Zéro à 100</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="zero_to_100"
                    type="text"
                    placeholder="5,4 sec"
                    value={input.zero_to_100}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="body_type"
                    type="text"
                    placeholder="Roadster"
                    value={input.body_type}
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>La cylindrée</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="displacement"
                    type="text"
                    placeholder="471 m³"
                    value={input.displacement}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Puissance maximum</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="maximum_power"
                    type="text"
                    placeholder="35 kW à 8 600 tr/min"
                    value={input.maximum_power}
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Le couple</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="maximum_torque"
                    type="text"
                    placeholder="43 Nm à 6 500 tr/min"
                    value={input.maximum_torque}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Row>
            {alerts.map((alert) => (
              <Alert key={alerts.indexOf(alert)} variant={alert.variant}>
                {alert.message}
              </Alert>
            ))}
          </Row>
          <Button variant="primary" onClick={postBike}>
            Envoyer
          </Button>
          <DeleteButton target={"bikes"} id={bike?.id} callback={afterDelete}/>
          <Button variant="warning" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default BikeEditFormModal;
