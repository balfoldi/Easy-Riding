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
    <motion.div key={bike} animate={{ x: 10, opacity: [0, 1]}} transition={{ duration: 0.5 }}>
      <h1>{bike.model}</h1>
      <hr></hr>
      <Card>
        <Carousel selectedItem={carouselCount} statusFormatter={formatter}>
          {bike.pictures &&
            bike.pictures.map((picture) => (
              <div key={picture.id}>
                <Card.Img variant="top" src={picture.url} />
              </div>
            ))}
        </Carousel>
        <Row>
          <Col sm="6">
            <Container>
              <h3>{bike.model}</h3>
              <h6>Présentation</h6>
              <p>{bike.description}</p>
            </Container>
          </Col>
          <Col sm="6">
            <Container>
              { !bike.offer && <Button onClick={toggleOfferModal} className="w-100 my-3" variant="primary">
                Créer une annonce
              </Button>}
              <ul>
                <p>Kilométrage : {bike.kilometrage} </p>
                <p>Marque : {bike.company_name}</p>
                <p>Catégorie : {bike.body_type}</p>
                <p>Cylindrée : {bike.displacement}</p>
                <p>Puissance : {bike.maximum_power}</p>
                <p>Torque : {bike.maximum_torque}</p>
                <p>0 à 100 : {bike.zero_to_100}</p>
              </ul>
            </Container>
          </Col>
        </Row>
        <Button variant='secondary' onClick={toggle} >Éditer</Button>
        <BikeEditFormModal
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        bike={bike}
        edit={true}
        fetchMyBike={fetchMyBike}
        fetchMyBikes={props.fetchMyBikes}
      />
      </Card>
      <OfferFormModal modal={offerModal} toggle={toggleOfferModal} bike={bike} fetchMyOffers={redirectToMyOffers}/>
      </motion.div>
  );
};

export default BikeShow;
