import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Cookies from "js-cookie";

const MyBikeList = ({ input, setInput }) => {
  const [bikes, setBikes] = useState([]);

  const fetchMyBikes = () => {
    fetch("/api/bikes.0", {
      headers: { Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setBikes(response);
      });
  };

  useEffect(() => {
    fetchMyBikes();
  }, []);

  const chooseBike = (id) => {
    setInput({
        ...input,
        bike_id: id
      });
  }
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Example select</Form.Label>
      <Form.Control as="select">
          <option>-</option>
        {bikes.map((bike, idx) => {
          <option key={idx} onClick={()=>chooseBike(bike.id)}>{bike.model}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default MyBikeList;
