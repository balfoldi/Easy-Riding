import "./index.scss";
import React, { useState } from "react";
import Garage from "./Garage";
import MyBookings from "./MyBookings";
import MyOffers from "./MyOffers";
import ProfileInfo from "./ProfileInfo"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Profile = () => {
  const [key, setKey] = useState('Garage');

  return (
    <div id="body">

    <Router>
        <Switch>
          <Route path="/mon_compte/profil" component={Profile} />
          <Route path="/mon_compte/garage" component={Offers} />
          <Route path="/mon_compte/mes-annonces" component={Offer} />
          <Route path="/mon_compte/reservations-recues" component={Login} />
          <Route path="/mon_compte/reservations-envoyées" component={Signup} />
          <Route path="/mon_compte/" component={TermsOfService} />
        </Switch>
    </Router>

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
          <Tab eventKey="MySentBooking" title="Reservations reçues">
            <div id="tab-body"><MyBookings consumer={"received"}/></div>
          </Tab>
          <Tab eventKey="MyReceivedBookings" title="Réservations Envoyées">
            <div id="tab-body"><MyBookings consumer={"sent"}/></div>
          </Tab>
        </Tabs>
    </div>
  );
}

export default Profile;
