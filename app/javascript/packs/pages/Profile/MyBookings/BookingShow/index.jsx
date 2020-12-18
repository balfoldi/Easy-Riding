import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Cookies from "js-cookie";
import DeleteButton from "../../../../components/Buttons/DeleteButton";
import { motion } from "framer-motion";

const BookingShow = ({ booking, consumer, fetchMyBookings }) => {
  const [carouselCount, setCarouselCount] = useState(0);
  const [thisBooking, setThisBooking] = useState(null);

  const fetchMyBooking = () => {
    fetch(`/api/bookings/${booking?.id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setThisBooking(response);
      });
  };

  useEffect(() => {
    if (booking) {
      fetchMyBooking();
    }
  }, [booking]);

  const afterDestroy = () => {
    fetchMyBookings();
  };

  const formatter = (current, total) => `Image: ${current} sur: ${total}`;
  return (
    <motion.div key={booking} animate={{ x: 10, opacity: [0, 1] }} transition={{ duration: 0.5 }}>
      {thisBooking && (
        <Card>
          <Carousel selectedItem={carouselCount} statusFormatter={formatter}>
            {thisBooking.pictures &&
              thisBooking.pictures.map((picture, idx) => (
                <div key={idx}>
                  <Card.Img variant="top" src={picture} />
                </div>
              ))}
          </Carousel>
          <Row>
            <Col sm="6">
              <Container>
                <h3>{thisBooking.offer.title}</h3>
                <hr></hr>
                <h6>Présentation</h6>
                <p>{thisBooking.offer.description}</p>
                <hr></hr>
                <h6>Dates proposés</h6>
                <Calendar
                  value={null}
                  minDate={new Date(thisBooking.start_date)}
                  maxDate={new Date(thisBooking.end_date)}
                  className="mr-auto ml-auto mb-3"
                />
              </Container>
            </Col>
            <Col sm="6">
              <Container>
                {consumer === "received" ? (
                  <>
                    <h3> Demandeur </h3>
                    <ul>
                      <li>Pseudonyme : {thisBooking.tenant.username}</li>
                      <li>Téléphone : {thisBooking.tenant.phone_number}</li>
                      <li>Email : {thisBooking.tenant.email}</li>
                    </ul>
                    <h4>Description</h4>
                    <i> {thisBooking.tenant.description}</i>
                  </>
                ) : (
                  <>
                    <ul>
                      <h4>Détails de l'annonce</h4>
                      <p>Prix journalier : {thisBooking.offer.daily_price} </p>
                      <p>Ville : {thisBooking.offer.city}</p>
                      <p>Zip code : {thisBooking.offer.zip_code}</p>
                      <p>Rue : {thisBooking.offer.street}</p>
                      <p>Région : {thisBooking.offer.region}</p>
                    </ul>
                    <ul>
                      <hr></hr>
                      <h4>Détails de la moto</h4>
                      <h5>
                        <strong>{thisBooking.bike.model}</strong>
                      </h5>
                      <hr></hr>
                      <p>Kilométrage : {thisBooking.bike.kilometrage} </p>
                      <p>Marque : {thisBooking.bike.company_name}</p>
                      <p>Catégorie : {thisBooking.bike.body_type}</p>
                      <p>Cylindrée : {thisBooking.bike.displacement}</p>
                      <p>Puissance : {thisBooking.bike.maximum_power}</p>
                      <p>Torque : {thisBooking.bike.maximum_torque}</p>
                      <p>0 à 100 : {thisBooking.bike.zero_to_100}</p>
                    </ul>
                  </>
                )}
              </Container>
            </Col>
          </Row>
          <DeleteButton
            target={"bookings"}
            id={booking?.id}
            callback={afterDestroy}
            message={"Ajourner"}
          />
        </Card>
      )}
    </motion.div>
  );
};

export default BookingShow;
