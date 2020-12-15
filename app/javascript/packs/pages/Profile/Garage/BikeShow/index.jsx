import React, { useEffect, useState, Component } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BikeEditFormModal from "./BikeEditFormModal"

const BikeShow = (props) => {
  const [bike, setBike] = useState([]);
  const [carouselCount, setCarouselCount] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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

  useEffect(() => {
    setCarouselCount(carouselCount - 1);
    console.log(carouselCount);
  }, [bike]);

  const formatter = (current, total) => `Image: ${current} sur: ${total}`
  return (
    <>
      <h1>{bike.model}</h1>
      <hr></hr>
      <Card>
        <Carousel selectedItem={carouselCount} statusFormatter={formatter}>
          {bike.pictures &&
            bike.pictures.map((picture) => (
              <div key={picture.id}>
                <Card.Img variant="top" src={picture.url} />)
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
              <Button className="w-100 my-3" variant="primary">
                Créer une annonce
              </Button>
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
      />
      </Card>
    </>
  );
};

export default BikeShow;
