import "./index.scss";
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
import AcceptButton from "../../../../components/Buttons/AcceptButton";

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
    setThisBooking(null)
  };

  const formatter = (current, total) => `Image: ${current} sur: ${total}`;
  return (
    <motion.div key={booking} animate={{ x: 10, opacity: [0, 1] }} transition={{ duration: 0.5 }}>
      {thisBooking && (
        <Container>
          <Card id="booking-global">
            <Carousel showThumbs={false} selectedItem={carouselCount} statusFormatter={formatter}>
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
                  <h3>{thisBooking.offer?.title}</h3>
                  <hr></hr>
                  <h4>Présentation</h4>
                  <p>
                    <span>{thisBooking.offer.description}</span>
                  </p>
                  <hr></hr>
                  <h6>Dates disponibles</h6>
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
                        <li>
                          Pseudonyme : <span>{thisBooking.tenant.username}</span>
                        </li>
                        <li>
                          Téléphone : <span>{thisBooking.tenant.phone_number}</span>
                        </li>
                        <li>
                          Email : <span>{thisBooking.tenant.email}</span>
                        </li>
                      </ul>
                      <h4>Description</h4>
                      <hr></hr>
                      <i>
                        {" "}
                        <span>{thisBooking.tenant.description}</span>
                      </i>
                      <hr></hr>
                      <AcceptButton target={"bookings"} id={booking?.id} callback={afterDestroy} />
                      <DeleteButton
                        target={"bookings"}
                        id={booking?.id}
                        callback={afterDestroy}
                        message={"Annuler la réservation"}
                      />
                    </>
                  ) : (
                    <>
                      <ul>
                        <h4>Détails de l'annonce</h4>
                        <p>
                          Prix journalier : <span>{thisBooking.offer.daily_price} €/j.</span>
                        </p>
                        <p>
                          Ville : <span>{thisBooking.offer.city}</span>
                        </p>
                        <p>
                          Zip code : <span>{thisBooking.offer.zip_code}</span>
                        </p>
                        <p>
                          Région : <span>{thisBooking.offer.region}</span>
                        </p>
                      </ul>
                      <ul>
                        <hr></hr>
                        <h4>Détails de la moto</h4>
                        <h5>
                          <strong>{thisBooking.bike.model}</strong>
                        </h5>
                        <hr></hr>
                        <p>
                          Kilométrage : <span>{thisBooking.bike.kilometrage} km</span>
                        </p>
                        <p>
                          Marque : <span>{thisBooking.bike.company_name}</span>
                        </p>
                        <p>
                          Catégorie : <span>{thisBooking.bike.body_type}</span>
                        </p>
                        <p>
                          Cylindrée : <span>{thisBooking.bike.displacement}</span>
                        </p>
                        <p>
                          Puissance : <span>{thisBooking.bike.maximum_power}</span>
                        </p>
                        <p>
                          Torque : <span>{thisBooking.bike.maximum_torque}</span>
                        </p>
                        <p>
                          0 à 100 : <span>{thisBooking.bike.zero_to_100}</span>
                        </p>

                        <DeleteButton
                          target={"bookings"}
                          id={booking?.id}
                          callback={afterDestroy}
                          message={"Demander l'annulation"}
                        />
                      </ul>
                    </>
                  )}
                </Container>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </motion.div>
  );
};

export default BookingShow;
