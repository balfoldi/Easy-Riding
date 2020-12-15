import "./index.scss";
import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { level-up-alt } from '@fortawesome/free-solid-svg-icons';

const BreadCrumb = () => {
  return (
    <Container>
      <Breadcrumb className="breadcrumb">
      <FontAwesomeIcon icon={level-up-alt} />
        <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Exemple de breadcrumb</Breadcrumb.Item>
      </Breadcrumb>
    </Container>
  );
}

export default BreadCrumb;
