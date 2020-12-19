import "./index.scss";
import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import BookingShow from "./BookingShow"

const MyBookings = ({consumer}) => {
  const [bookings, setBookings] = useState(null);
  const [booking, setBooking] = useState(null);

  const fetchMyBookings = () => {
    fetch(`/api/bookings.${consumer}`, {
      headers: { Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setBookings(response);
        setBooking(response[0]);
      });
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <Container>
      <div id="booking">
        <div className="col-sm-3" id="booking-list">
          <Card>
            <Card.Title>
              <h2>Mes réservations</h2>
            </Card.Title>
            <Card.Body>
            {bookings?.map((booking, idx)=>(
              <Card key={booking.id} id="booking-thumbnail" onClick={()=>setBooking(booking)}>
                <Card.Body id="booking-date">
                  <p>{booking.start_date}</p>
                </Card.Body>
                <Card.Body id="booking-name">
                  {booking.offer.title}
                </Card.Body>
              </Card>
            ))}
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-9" id="booking-detail">
          <BookingShow booking={booking}  fetchMyBookings={fetchMyBookings} consumer={consumer}/>
        </div>
      </div>
    </Container>
  );
};

export default MyBookings;
