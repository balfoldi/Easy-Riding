import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Card, Form, Alert } from "react-bootstrap";

const PictureInput = ({pictures, setPictures}) => {
  const [Previews, setPreviews] = useState([])
  ;

  const onImageChange = (event) => {
    setPictures(pictures.concat(event.target.files[0]));
  };

  useEffect(() => {
    console.log(pictures);
    setPreviews(pictures.map((picture) => URL.createObjectURL(picture)));
  }, [pictures]);

  const deletePicture = (index) => {
    setPictures(pictures.filter((picture) => (pictures.indexOf(picture)!== index)));
  };

  return (
    <>
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

export default PictureInput
