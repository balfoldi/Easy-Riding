import "./index.scss";
import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BreadCrumb = () => {
  return (
    <Container>
      <Breadcrumb className="breadcrumb">
        <div>
        Vous etes ici : </div>
        <Breadcrumb.Item href="/" className="ml-3 mr-3 breadcrumb_link">Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active className="color breadcrumb_link">Exemple de breadcrumb</Breadcrumb.Item>
      </Breadcrumb>
    </Container>
  );
}

export default BreadCrumb;
