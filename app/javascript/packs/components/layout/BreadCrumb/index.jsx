import "./index.scss";
import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Container } from "reactstrap";


const BreadCrumb = () => {
  return (
    <Container>
      <Breadcrumb className="breadcrumb">
        <div>
        Vous etes ici : </div>
        <Redirect className="ml-3 mr-3 breadcrumb" to="/"> Accueil</Redirect>
        <div className="color breadcrumb"> EXEMPLE</div>
      </Breadcrumb>
    </Container>
  );
}

export default BreadCrumb;
