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
        setBooking(response.length > 0 ? response[0] : null);
      });
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <Container>
      <div id="booking">
        <div className="col-sm-3" id="booking-list">
          <h2>Réservations</h2>
          {bookings?.map((booking, idx)=>(
            <Card key={booking.id} id="booking-thumbnail" onClick={()=>setBooking(booking)}>
              <Card.Body id="booking-info">
                <p>{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.offer.end_date).toLocaleDateString()}</p>
              <hr></hr>
                {booking.offer.title}
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="col-sm-9" id="booking-detail">
          <BookingShow booking={booking}  setBooking={setBooking} fetchMyBookings={fetchMyBookings} consumer={consumer}/>
        </div>
      </div>
    </Container>
  );
};

export default MyBookings;
