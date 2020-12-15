import React, { useEffect, useState } from "react";
import OfferFormModal from "./OfferFormModal";
import { Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const MyOffers = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [offers, setOffers] = useState([]);

  const fetchMyOffers = () => {
    fetch("/api/offers")
      .then((response) => response.json())
      .then((response) => {
        setOffers(response);
      });
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  return (
    <Container>
      <React.Fragment>
        <Breadcrumb className="breadcrumb">
          <div id="Introductionphrase">Vous etes ici :</div>
          <Breadcrumb.Item href="/" className="ml-2 breadcrumb_link">
            Accueil
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/mon-compte" className="ml-2 breadcrumb_link">
            mon compte
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="color breadcrumb_link">
            Mes annonces
          </Breadcrumb.Item>
        </Breadcrumb>
      </React.Fragment>

      {offers ? (
        <Row>
          <Col sm="3" className="pt-5">
            <h4>Mes Annones</h4>
            <hr></hr>
            <Button color="danger" onClick={toggle}>
              Ajouter une annonce
            </Button>
            <hr></hr>
          </Col>
          <Col sm="9">
            <p>mes anonces ici</p>
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
      <OfferFormModal
        modal={modal}
        toggle={toggle}
        fetchMyBikes={fetchMyOffers}
      />
    </Container>
  );
};

export default MyOffers;
