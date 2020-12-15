import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Card, Form, Alert } from "react-bootstrap";

const PictureInput = ({ pictures, setPictures }) => {
  const [Previews, setPreviews] = useState([]);
  const [alert, setAlert] = useState(false);

  const onImageChange = (event) => {
    console.log("checking image count");
    if (errorCheck()) {
      console.log("aborting");
      return;
    }
    console.log("adding");
    if(event.target.files[0]){
      setPictures(pictures.concat(event.target.files[0]));
    }
  };

  const errorCheck = () => {
    if (pictures.length > 2) {
      setAlert(true);
      return true;
    } else {
      setAlert(false);
      return false;
    }
  };

  useEffect(() => {
    console.log(pictures);
    setPreviews(pictures.map((picture) => URL.createObjectURL(picture)));
  }, [pictures]);

  const deletePicture = (index) => {
    setPictures(pictures.filter((picture) => pictures.indexOf(picture) !== index));
  };

  return (
    <>
      {alert && <Alert variant="warning">Trois photos maximum</Alert>}

      <Form.Group>
        <Form.File
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
          id="exampleFormControlFile1"
          label="Images, entre une et trois"
        />
        <Card>
          <Card.Body>
            <Row>
              {Previews.map((preview) => (
                <Col key={Previews.indexOf(preview)} sm="4">
                  <div
                    className="text-danger"
                    onClick={() => deletePicture(Previews.indexOf(preview))}
                  >
                    X
                  </div>
                  <img className="m-1 img-fluid" src={preview}></img>
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
