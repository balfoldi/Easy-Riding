import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Row, Col } from "reactstrap";

const BikeShow = (props) => {
  const [bike, setBike] = useState([]);

  const fetchMyBike = () => {
    fetch(`/api/bikes/${props.bike.id}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setBike(response);
      });
  };

  useEffect(() => {
    fetchMyBike();
  }, [props.bike]);

  return (
    <>
    <h1>{bike.model}</h1>
    <hr></hr>
    <Card>
      <Card.Img variant='top' src="https://www.echoduberry.fr/wp-content/uploads/2019/07/LC-34-0407-dragster-moto.jpg" />
      <Row>
      <Col sm='6'>
        <Container>
          <h3>{bike.model}</h3>
          <h6>Présentation</h6>
          <p>{bike.description}</p>
        </Container>
      </Col>
      <Col sm='6'>
        <Container>
          <Button className="w-100 my-3" variant="primary">Créer une annonce</Button>
          <ul>
            <p>Kilométrage : {bike.kilometrage} </p>
            <p>Marque : {bike.company_name}</p>
            <p>Catégorie : {bike.body_type}</p>
            <p>Puissance : {bike.maximum_power}</p>
            <p>Torque : {bike.maximum_torque}</p>
            <p>0 à 100 :{bike.zero_to_100} secondes</p>
          </ul>
        </Container>
      </Col>
      </Row>
    </Card>
    </>
  );
};

export default BikeShow;
