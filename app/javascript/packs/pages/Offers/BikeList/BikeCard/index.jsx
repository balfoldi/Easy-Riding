import "./index.scss";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BikeCard = (offer) => {
  return (
    <Card id="bike-card">
      <Card.Body id="body">
        <Card.Title id="title">{offer.offer.bike.model}</Card.Title>
        <Card.Text id="text">{offer.offer.description}</Card.Text>
      </Card.Body>
      <Button id="main-btn">
        <p>{offer.offer.daily_price}€/jour</p>
      </Button>
      <div id="image" style={{ "background-image": `url("${offer.offer.pictures}")` }}>
        <Button id="to-offer">
          {" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </Card>
  );
};

export default BikeCard;
