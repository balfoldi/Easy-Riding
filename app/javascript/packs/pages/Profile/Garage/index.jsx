import "./index.scss";
import React, { useState, useEffect } from "react";
import BikeFormModal from "./BikeFormModal";
import { Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import ProfileInfo from "../ProfileInfo";
import BikeShow from "./BikeShow";
import Cookies from "js-cookie";

const Garage = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState(null);

  const fetchMyBikes = () => {
    fetch("/api/bikes.0", {
      headers: { Authorization: `Bearer ${Cookies.get("EasyRidingUserToken")}` },
    })
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
    <div>
      {bike ? (
        <Row>
          <Col className="col-sm-4">
            <ProfileInfo />
            <hr></hr>
            <Button color="danger" onClick={toggle}>
              Ajouter une moto
            </Button>
            <hr></hr>
            <h4>Mes Motos</h4>
            {bikes.map((bike) => (
              <Button key={bikes.indexOf(bike)} variant="light" onClick={() => setBike(bike)}>
                {bike.model}
              </Button>
            ))}
          </Col>
          <Col sm="7">
            <BikeShow bike={bike} fetchMyBikes={fetchMyBikes}/>
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
    </div>
  );
};
export default Garage;
