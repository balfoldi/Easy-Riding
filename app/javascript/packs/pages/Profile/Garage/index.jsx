import "./index.scss";
import React, { useState, useEffect } from "react";
import BikeFormModal from "./BikeFormModal";
import { Button, Card } from "react-bootstrap";
import { Row, Col } from "reactstrap";
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
        console.log(response)
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
        <div id="row">
          <Col className="col-sm-5">
            <ProfileInfo />
            <Card id="bike-control" className="my-3">
              <Card.Body id="card-body">
                <Card.Title><h4>Mes Motos</h4></Card.Title>
                <Button id="new-bike" onClick={toggle}>
                Ajouter une moto
                </Button>
              </Card.Body>
            </Card>
            <Card>
              {bikes.map((bike) => (
              <Card.Body id="card-body">
              <Card.Title><h4>{bike.model}</h4></Card.Title>
                <Button key={bikes.indexOf(bike)} variant="light" onClick={() => setBike(bike)}>
                  {bike.model}
                </Button>
              </Card.Body>
              ))}
            </Card>
          </Col>
          <Col className="col-sm-7">
            <BikeShow bike={bike} fetchMyBikes={fetchMyBikes}/>
          </Col>
        </div>
      ) : (
        <div>
        <Card className="my-5">
          <Card.Body>
            <Button onClick={toggle} className="w-100">
              Ajoute ta première moto!
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
