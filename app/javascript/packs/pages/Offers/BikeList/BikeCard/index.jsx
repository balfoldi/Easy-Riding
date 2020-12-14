import "./index.scss";
import React from "react";
import { Card, Button } from "react-bootstrap";
import Moto from "../../moto.jpg";

const BikeCard = () => {
  return (
    <Card id="bike-card">
      <Card.Body id="body">
        <Card.Title id="title">Nom de la moto</Card.Title>
        <Card.Text id="text">
          <p>Description de l'annonce blablablablablablablabla...</p>
          <p>Ville (00)</p>
        </Card.Text>
      </Card.Body>
      <Button id="main-btn">
        50€/jour
      </Button>
      <div id="image">
        <Button id="to-offer">
        >
        </Button>
      </div>
    </Card>
  );
};

export default BikeCard;
