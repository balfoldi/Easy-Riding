import React, { useEffect, useState } from "react";
import OfferFormModal from "./OfferFormModal";
import { Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Cookies from "js-cookie";
import OfferShow from './OfferShow'

const MyOffers = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [offers, setOffers] = useState([]);

  const fetchMyOffers = () => {
    fetch("/api/offers.0", {
      headers: { Authorization: `Bearer ${Cookies.get("EasyRiderUserToken")}` },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setOffers(response);
      });
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  useEffect(() => {
    console.log(offers);
  }, [offers]);
  return (
    <Container>

      {offers ? (
        <Row>
          <Col sm="3" className="pt-5">
            <hr></hr>
            <Button color="danger" onClick={toggle}>
              Ajouter une annonce
            </Button>
            <hr></hr>
          </Col>
          <Col sm="9">
            {offers.map((offer, idx) => (
              <OfferShow fetchMyOffers={fetchMyOffers} key={idx} offer={offer} />
            ))}
          </Col>
        </Row>
      ) : (
        <Card className="my-5">
          <Card.Body>
            <Button onClick={toggle} className="w-100">
              Créer une annonce.
            </Button>
          </Card.Body>
        </Card>
      )}
      <OfferFormModal modal={modal} toggle={toggle} fetchMyOffers={fetchMyOffers}/>
    </Container>
  );
};

export default MyOffers;
