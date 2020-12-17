import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
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
        console.log(response);
        setBookings(response);
        setBooking(response[0]);
      });
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  useEffect(() => {
    console.log(booking?.id)
  }, [booking]);

  return (
    <Container>
      <Row>
        <Col sm={3}>
          {bookings?.map((booking, idx)=>(
            <Button onClick={()=>setBooking(booking)} key={idx} variant="light">{booking.offer.title}</Button>
          ))}
        </Col>
        <Col sm={9}>
          <BookingShow booking={booking}  fetchMyBookings={fetchMyBookings} consumer={consumer}/>
        </Col>
      </Row>
    </Container>
  );
};

export default MyBookings;
