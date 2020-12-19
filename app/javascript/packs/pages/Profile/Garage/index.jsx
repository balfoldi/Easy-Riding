import "./index.scss";
import React, { useState, useEffect } from "react";
import BikeFormModal from "./BikeFormModal";
import { Button, Card } from "react-bootstrap";
import { Row, Col, Container } from "reactstrap";
import ProfileInfo from "../ProfileInfo";
import BikeShow from "./BikeShow";
import Cookies from "js-cookie";
import Repair from "./repair-bike.png";

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
        <Row id="row">
          <Col id="left-part" sm="4">
            <Container>
              <ProfileInfo />
              <Card id="bike-control" className="my-3">
                <Card.Body id="card-body">
                  <Card.Title><h4>Mes Motos</h4></Card.Title>
                  <Button id="new-bike" onClick={toggle}>
                  Ajouter une moto
                  </Button>
                </Card.Body>
              </Card>
              {bikes.map((bike) => (
              <Card key={bike.id} id="bike-thumbnail" onClick={() => setBike(bike)}>
                <Card.Body id="bike-img"
                  style={{backgroundImage: `url(${bike.picture})`}}>
                </Card.Body>
                <Card.Body id="bike-name">
                  <p key={bikes.indexOf(bike)}>
                    {bike.model}
                  </p>
                </Card.Body>
              </Card>
              ))}
            </Container>
          </Col>
          <Col sm="8">
              <Container>
                <BikeShow bike={bike} fetchMyBikes={fetchMyBikes}/>
              </Container>
          </Col>
        </Row>
      ) : (
        <div>
          <Card id="empty-card">
            <Card.Body id="empty-body">
              <h1>Mon Garage</h1>
              <Card.Img id="logo" src={Repair} alt="repair" />
              <Button id="empty-button" onClick={toggle}>
                Pour afficher votre garage, ajoutez votre première moto !
              </Button>
            </Card.Body>
          </Card>
        </div>
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
