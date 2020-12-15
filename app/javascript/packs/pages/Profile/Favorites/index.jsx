import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Favorites = () => {
return (
    <React.Fragment >
      <Breadcrumb className="breadcrumb">
            <div id="Introductionphrase">Vous etes ici :</div>
            <Breadcrumb.Item href="/" className="ml-2 breadcrumb_link">Accueil
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/mon-compte" className="ml-2 breadcrumb_link">mon compte
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="color breadcrumb_link">Mes favoris
            </Breadcrumb.Item>
          </Breadcrumb>
      <p>Section Favorites en cours de construction...</p>
    </React.Fragment>
  );
};
export default Favorites;
