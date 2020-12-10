import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item active>Exemple de breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadCrumb;
