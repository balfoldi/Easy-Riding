import "./index.scss";
import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BikeEditFormModal from "./BikeEditFormModal"
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import OfferFormModal from "../../MyOffers/OfferFormModal";

const BikeShow = (props) => {
  const history = useHistory();
  const [bike, setBike] = useState([]);
  const [carouselCount, setCarouselCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const toggleOfferModal = () => setOfferModal(!offerModal)
  const toggle = () => setModal(!modal);

  const fetchMyBike = () => {
    fetch(`/api/bikes/${props.bike.id}`)
      .then((response) => response.json())
      .then((response) => {
        setBike(response);
      });
  };

  useEffect(() => {
    fetchMyBike();
  }, [props.bike]);

  useEffect(() => {
    setCarouselCount(carouselCount - 1);
  }, [bike]);

  const redirectToMyOffers = () => {
    history.push('/mon-compte/mes-annonces');
  }

  const formatter = (current, total) => `Image: ${current} sur: ${total}`
  return (
    <motion.div  key={bike} animate={{ x: 10, opacity: [0, 1]}} transition={{ duration: 0.5 }}>

      <Card id="right-part">
      <h1 id="bike-title">{bike.model}</h1>
      <hr></hr>
        <Carousel id="carousel" showThumbs={false}
        selectedItem={carouselCount}  statusFormatter={formatter}>
          {bike.pictures &&
            bike.pictures.map((picture) => (
              <div id="carousel-img" key={picture.id}>
                <Card.Img  variant="top" src={picture.url} />
              </div>
            ))}
        </Carousel>
        <Row>
          <Col sm="6" id="presentation-left">
            <Container>
              <h3>{bike.model}</h3>
              <hr></hr>
              <h5>Présentation</h5>
              <p id="description">{bike.description}</p>
              <hr></hr>
              <Button id="offer-button" onClick={toggle}>
                Éditer la moto
              </Button>
              <BikeEditFormModal
                modal={modal}
                toggle={toggle}
                setModal={setModal}
                bike={bike}
                edit={true}
                fetchMyBike={fetchMyBike}
                fetchMyBikes={props.fetchMyBikes}
              />
            </Container>
          </Col>
          <Col sm="6" id="presentation-right">
            <Container>
              <ul>
              { !bike.offer && <Button onClick={toggleOfferModal} className="w-100 my-3" variant="primary">
                Créer une annonce
              </Button>}
                <p>Kilométrage : <span>{bike.kilometrage}</span></p>
                <p>Marque : <span>{bike.company_name}</span></p>
                <p>Catégorie : <span>{bike.body_type}</span></p>
                <p>Cylindrée : <span>{bike.displacement}</span></p>
                <p>Puissance : <span>{bike.maximum_power}</span></p>
                <p>Torque : <span>{bike.maximum_torque}</span></p>
                <p>0 à 100 : <span>{bike.zero_to_100}</span></p>
              </ul>
            </Container>
          </Col>
        </Row>

      </Card>

      <OfferFormModal modal={offerModal} toggle={toggleOfferModal} bike={bike} fetchMyOffers={redirectToMyOffers}/>
      </motion.div>
  );
};

export default BikeShow;
