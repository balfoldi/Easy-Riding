import React, { useState, useEffect } from "react";
import BikeFormModal from "./BikeFormModal";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import BikeShow  from './BikeShow'

const Garage = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState({})

  const fetchMyBikes = () => {
    fetch("/api/bikes")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setBikes(response);
        setBike(response[0])
      });
  };

  useEffect(() => {
    fetchMyBikes();
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="3" className="pt-5">
          <h4>Mes Motos</h4>
          <hr></hr>
          <Button color="danger" onClick={toggle}>
            Ajouter une moto
          </Button>
          <hr></hr>
          {bikes.map((bike) => (
            <Button variant="light" onClick={()=>setBike(bike)}>{bike.model}</Button>
          ))}
        </Col>
        <Col sm='9'>
        <BikeShow bike={bike}/>
        </Col>
        <BikeFormModal
          modal={modal}
          toggle={toggle}
          fetchMyBikes={fetchMyBikes}
          setModal={setModal}
        />
      </Row>
    </Container>
  );
};
export default Garage;
