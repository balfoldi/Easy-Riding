import "./index.scss";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

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
        <Link to={`/annonce/${offer.offer.id}`} id="home-link">
          <Button id="to-offer">
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default BikeCard;
