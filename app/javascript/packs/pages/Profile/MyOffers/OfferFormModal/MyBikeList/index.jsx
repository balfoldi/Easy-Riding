import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Cookies from "js-cookie";

const MyBikeList = ({ input, setInput }) => {
  const [bikes, setBikes] = useState([]);

  const fetchMyBikes = () => {
    fetch("/api/bikes.0", {
      headers: { Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setBikes(response);
        setInput({
            ...input,
            bike_id: response[0].id,
          });
      });
  };

  useEffect(() => {
    fetchMyBikes()
  }, []);

  const handleInputChange = (e) => {
    setInput({
        ...input,
        bike_id: e.target.value,
      });
  };

  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Choisir une moto de mon garage</Form.Label>
      <Form.Control as="select" onChange={handleInputChange} value={input.bike_id}>
        {bikes.map((bike, idx) => (
          <option value={bike.id} key={idx}>{bike.model}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default MyBikeList;
