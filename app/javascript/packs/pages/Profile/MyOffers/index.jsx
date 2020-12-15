import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const MyOffers = () => {
return (
  <React.Fragment >
    <Breadcrumb className="breadcrumb">
      <div id="Introductionphrase">Vous etes ici :</div>
      <Breadcrumb.Item href="/" className="ml-2 breadcrumb_link">Accueil
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/mon-compte" className="ml-2 breadcrumb_link">mon compte
      </Breadcrumb.Item>
      <Breadcrumb.Item active className="color breadcrumb_link">Mes annonces
      </Breadcrumb.Item>
    </Breadcrumb>
    <h2>Page Mes Annonces en cours de construction...</h2>
  </React.Fragment>
  )
}

export default MyOffers;
