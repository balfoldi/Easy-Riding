import "./index.scss";
import React, { useState } from "react";
import Favorites from "./Favorites";
import Garage from "./Garage";
import MyBookings from "./MyBookings";
import MyOffers from "./MyOffers";
import ProfileInfo from "./ProfileInfo"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Profile = () => {
  const [key, setKey] = useState('ProfileInfo');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="ProfileInfo" id="tab-profile" title="Mon profil">
        <div id="tab-body"><ProfileInfo /></div>
      </Tab>
      <Tab eventKey="Garage" id="tab-garage" title="Mon garage">
        <div id="tab-body"><Garage /></div>
      </Tab>
      <Tab eventKey="MyOffers" id="tab-offers" title="Mes annonces">
        <div id="tab-body"><MyOffers /></div>
      </Tab>
      <Tab eventKey="Favorites" id="tab-favorites" title="Mes favoris">
        <div id="tab-body"><Favorites /></div>
      </Tab>
      <Tab eventKey="MyBookings" id="tab-bookings" title="Mes réservations">
        <div id="tab-body"><MyBookings /></div>
      </Tab>
    </Tabs>
  );
}

export default Profile;
