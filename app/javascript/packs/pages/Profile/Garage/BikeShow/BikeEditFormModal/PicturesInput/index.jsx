import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Card, Form, Alert } from "react-bootstrap";

const PictureInput = ({ newPictures, setNewPictures, currentPictures, setCurrentPictures }) => {
  const [Previews, setPreviews] = useState([]);
  const [alert, setAlert] = useState(false);

  const onImageChange = (event) => {
    console.log("checking image count");
    if (errorCheck()) {
      console.log("aborting");
      return;
    }
    console.log("adding");
    setNewPictures(newPictures.concat(event.target.files[0]));
  };

  const errorCheck = () => {
    console.log("checking error");
    const aliveCurrentPicture = currentPictures.filter(
      (currentPicture) => currentPicture.kill === false
    );
    console.log("alive currents pictures");
    console.log(aliveCurrentPicture);
    if (newPictures.length + aliveCurrentPicture.length > 2) {
      setAlert(true);
      return true;
    } else {
      setAlert(false);
      return false;
    }
  };

  useEffect(() => {
    console.log(newPictures);
    setPreviews(newPictures?.map((picture) => URL.createObjectURL(picture)));
  }, [newPictures]);

  const deleteNewPicture = (index) => {
    setNewPictures(newPictures.filter((newPicture) => newPictures.indexOf(newPicture) !== index));
  };

  const deleteCurrentPicture = (id) => {
    setCurrentPictures(
      currentPictures.map((currentPicture) => {
        if (currentPicture.id === id) {
          currentPicture.kill = true;
        }
        return currentPicture;
      })
    );
    console.log(currentPictures);
  };

  return (
    <>
      {alert && <Alert variant="warning">Trois photos maximume</Alert>}
      <Form.Group>
        <Form.File
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
          label="Photos, entre une et trois"
        />
        <i>Nouvelles photos</i>
        <Card>
          <Card.Body>
            <Row>
              {Previews?.map((preview, idx) => (
                <Col key={idx} sm="4">
                  <div
                    className="text-danger"
                    onClick={() => deleteNewPicture(Previews.indexOf(preview))}
                  >
                    X
                  </div>
                  <img className="m-1 img-fluid" src={preview}></img>
                </Col>
              ))}
              {currentPictures
                ?.filter((currentPicture) => currentPicture.kill === false)
                .map((currentPicture, idx) => (
                  <Col key={idx} sm="4">
                    <div
                      className="text-danger"
                      onClick={() => deleteCurrentPicture(currentPicture.id)}
                    >
                      X
                    </div>
                    <img className="m-1 img-fluid" src={currentPicture.url}></img>
                  </Col>
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Form.Group>
    </>
  );
};

export default PictureInput;
