import Calendar from "react-calendar";
import React, { useEffect, useState, Component } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import OfferFormModal from "../OfferFormModal";

const OfferShow = ({ offer, fetchMyOffers }) => {
  console.log(offer);

  const [carouselCount, setCarouselCount] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setCarouselCount(carouselCount - 1);
    console.log(carouselCount);
  }, [offer]);

  const formatter = (current, total) => `Image: ${current} sur: ${total}`;
  return (
    <>
      <h1>{offer.title}</h1>
      <hr></hr>
      <Card>
        <Carousel selectedItem={carouselCount} statusFormatter={formatter}>
          {offer.pictures &&
            offer.pictures.map((picture) => (
              <div key={picture.id}>
                <Card.Img variant="top" src={picture} />
              </div>
            ))}
        </Carousel>
        <Row>
          <Col sm="6">
            <Container>
              <h3>{offer.title}</h3>
              <hr></hr>
              <h6>Présentation</h6>
              <p>{offer.description}</p>
              <hr></hr>
              <h6>Disponibilités</h6>
              <Calendar
                value={null}
                minDate={new Date(offer.start_date)}
                maxDate={new Date(offer.end_date)}
                className="mr-auto ml-auto mb-3"
              />
            </Container>
          </Col>
          <Col sm="6">
            <Container>
              <ul>
                <h4>Détails de l'annonce</h4>
                <p>Prix journalier : {offer.daily_price} </p>
                <p>Ville : {offer.city}</p>
                <p>Zip code : {offer.zip_code}</p>
                <p>Rue : {offer.street}</p>
                <p>Région : {offer.region}</p>
              </ul>
              <ul>
                <hr></hr>
                <h4>Détails de la moto</h4>
                <h5>
                  <strong>{offer.bike.model}</strong>
                </h5>
                <hr></hr>
                <p>Kilométrage : {offer.bike.kilometrage} </p>
                <p>Marque : {offer.bike.company_name}</p>
                <p>Catégorie : {offer.bike.body_type}</p>
                <p>Cylindrée : {offer.bike.displacement}</p>
                <p>Puissance : {offer.bike.maximum_power}</p>
                <p>Torque : {offer.bike.maximum_torque}</p>
                <p>0 à 100 : {offer.bike.zero_to_100}</p>
              </ul>
            </Container>
          </Col>
        </Row>
        <Button variant="secondary" onClick={toggle}>
          Éditer
        </Button>
        <OfferFormModal modal={modal} fetchMyOffers={fetchMyOffers} toggle={toggle} offer={offer} />
      </Card>
    </>
  );
};

export default OfferShow;
