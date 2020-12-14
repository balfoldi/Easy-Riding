import React, { useState, useEffect } from "react";
import BikeFormModal from "./BikeFormModal";
import { Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import BikeShow from "./BikeShow";

const Garage = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState(null);

  const fetchMyBikes = () => {
    fetch("/api/bikes")
      .then((response) => response.json())
      .then((response) => {
        setBikes(response);
        setBike(response[0]);
      });
  };

  useEffect(() => {
    fetchMyBikes();
  }, []);

  return (
    <Container>
      {bike ? (
        <Row>
          <Col sm="3" className="pt-5">
            <h4>Mes Motos</h4>
            <hr></hr>
            <Button color="danger" onClick={toggle}>
              Ajouter une moto
            </Button>
            <hr></hr>
            {bikes.map((bike) => (
              <Button key={bikes.indexOf(bike)} variant="light" onClick={() => setBike(bike)}>
                {bike.model}
              </Button>
            ))}
          </Col>
          <Col sm="9">
            <BikeShow bike={bike} />
          </Col>
        </Row>
      ) : (
        <Card className="my-5">
          <Card.Body>
            <Button onClick={toggle} className="w-100">
              Ajoute ta première moto!
            </Button>
          </Card.Body>
        </Card>
      )}
      <BikeFormModal
        modal={modal}
        toggle={toggle}
        fetchMyBikes={fetchMyBikes}
        setModal={setModal}
      />
    </Container>
  );
};
export default Garage;
