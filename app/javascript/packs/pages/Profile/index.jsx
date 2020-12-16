import "./index.scss";
import React, { useState } from "react";
import Favorites from "./Favorites";
import Garage from "./Garage";
import MyBookings from "./MyBookings";
import MyOffers from "./MyOffers";
import ProfileInfo from "./ProfileInfo"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Profile = () => {
  const [key, setKey] = useState('MyOffers');

  return (
    <div id="body">
        <Breadcrumb className="breadcrumb">
          <div id="Introductionphrase">Vous etes ici :</div>
          <Breadcrumb.Item href="/" className="ml-2 breadcrumb_link">Accueil</Breadcrumb.Item>
          <Breadcrumb.Item active className="color breadcrumb_link">Mon compte</Breadcrumb.Item>
        </Breadcrumb>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="ProfileInfo" title="Profil">
            <div id="tab-body"><ProfileInfo /></div>
          </Tab>
          <Tab eventKey="Garage" title="Garage">
            <div id="tab-body"><Garage /></div>
          </Tab>
          <Tab eventKey="MyOffers" title="Annonces">
            <div id="tab-body"><MyOffers /></div>
          </Tab>
          <Tab eventKey="Favorites" title="Favoris">
            <div id="tab-body"><Favorites /></div>
          </Tab>
          <Tab eventKey="MyBookings" title="Réservations">
            <div id="tab-body"><MyBookings /></div>
          </Tab>
        </Tabs>
    </div>
  );
}

export default Profile;
