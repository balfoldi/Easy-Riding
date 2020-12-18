import "./index.scss";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BikeCard = ({offer, offers}) => {
  return (
    <motion.div key={offers} whileHover={{ scale: 1.01, y: -5 }}  animate={{ x: 10, opacity: [0, 1]}} transition={{ duration: 0.2 }} >
      <Card id="bike-card">
        <Card.Body
          id="body"
        >
          <Card.Title id="title">{offer.bike.model}</Card.Title>
          <Card.Text id="text">{offer.description}</Card.Text>
        </Card.Body>
        <Button id="main-btn">
          <p>{offer.daily_price}€/jour</p>
        </Button>
        <div id="image" style={{ "background-image": `url("${offer.pictures}")` }}>
          <Link to={`/annonce/${offer.id}`} id="home-link">
            <Button id="to-offer">
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default BikeCard;
