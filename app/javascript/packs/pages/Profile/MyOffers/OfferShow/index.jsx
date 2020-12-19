import "./index.scss";
import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import OfferFormModal from "../OfferFormModal";
import BookingModal from "../../../Offer/BookingModal";
import { motion } from "framer-motion";

const OfferShow = ({ offer, fetchMyOffers, consumer }) => {
  const [carouselCount, setCarouselCount] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setCarouselCount(carouselCount - 1);
  }, [offer]);

  const formatter = (current, total) => `Image: ${current} sur: ${total}`;
  return (
    <motion.div key={offer} animate={{ x: 10, opacity: [0, 1] }} transition={{ duration: 0.5 }}>
      <h1 id="offer-title">Mes annonces</h1>
      <Card id="offer-detail">
        <Carousel showThumbs={false} selectedItem={carouselCount} statusFormatter={formatter}>
          {offer.pictures &&
            offer.pictures.map((picture, idx) => (
              <div key={idx}>
                <Card.Img variant="top" src={picture} />
              </div>
            ))}
        </Carousel>
        <Row id="offer-info">
          <Col sm="6">
            <Container>
              <h3>{offer.title}</h3>
              <hr></hr>
              <h4>Présentation</h4>
              <p>
                <span>{offer.description}</span>
              </p>
              <hr></hr>
              <h6>Disponibilités</h6>
              <Calendar
                value={null}
                minDate={new Date(offer.start_date)}
                maxDate={new Date(offer.end_date)}
                className="mr-auto ml-auto mb-3"
              />
              {!consumer ? (
                <>
                  <Button variant="warning" onClick={toggle}>
                    Modifier l'annonce
                  </Button>
                  <OfferFormModal
                    modal={modal}
                    fetchMyOffers={fetchMyOffers}
                    toggle={toggle}
                    offer={offer}
                  />
                </>
              ) : (
                <BookingModal modal={modal} toggle={toggle} offer={offer} />
              )}
            </Container>
          </Col>
          <Col sm="6">
            <Container>
              <ul>
                <h4>Détails de l'annonce</h4>
                <p>
                  Prix journalier : <span>{offer.daily_price} €/j.</span>{" "}
                </p>
                <p>
                  Ville : <span>{offer.city}</span>
                </p>
                <p>
                  Zip code : <span>{offer.zip_code}</span>
                </p>
                <p>
                  Région : <span>{offer.region}</span>
                </p>
              </ul>
              <ul>
                <hr></hr>
                <h4>Détails de la moto</h4>
                <h5>
                  <strong>
                    <span>{offer.bike.model}</span>
                  </strong>
                </h5>
                <hr></hr>
                <p>
                  Kilométrage : <span>{offer.bike.kilometrage} km</span>{" "}
                </p>
                <p>
                  Marque : <span>{offer.bike.company_name}</span>
                </p>
                <p>
                  Catégorie : <span>{offer.bike.body_type}</span>
                </p>
                <p>
                  Cylindrée : <span>{offer.bike.displacement}</span>
                </p>
                <p>
                  Puissance : <span>{offer.bike.maximum_power}</span>
                </p>
                <p>
                  Torque : <span>{offer.bike.maximum_torque}</span>
                </p>
                <p>
                  0 à 100 : <span>{offer.bike.zero_to_100}</span>
                </p>
                {consumer && <Button variant="success" onClick={toggle}> Demande de réservation </Button>}
              </ul>
            </Container>
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
};

export default OfferShow;
