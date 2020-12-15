import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const MyBookings = () => {
return (
  <Container>
    <Breadcrumb className="breadcrumb">
      <div id="Introductionphrase">Vous etes ici :</div>
      <Breadcrumb.Item href="/" className="ml-2 breadcrumb_link">Accueil
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/mon-compte" className="ml-2 breadcrumb_link">mon compte
      </Breadcrumb.Item>
      <Breadcrumb.Item active className="color breadcrumb_link">Mes réservations
      </Breadcrumb.Item>
    </Breadcrumb>
    <p>Page Mes réservations en cours de construction...</p>
  </Container>
  )
}

export default MyBookings;
