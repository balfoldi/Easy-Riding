import "./index.scss";
import React, { useState, useEffect } from "react";
import Garage from "./Garage";
import MyBookings from "./MyBookings";
import MyOffers from "./MyOffers";
import ProfileInfo from "./ProfileInfo";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useHistory } from 'react-router-dom';

const Profile = () => {
  let history = useHistory();
  
  const [key, setKey] = useState(null)

  useEffect(()=>{
    console.log("key",key)
    console.log("history", history)
    setKey(window.location.href.split("/")[4])
  })

  return (
    <div id="body">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          history.push(`${k}`)
        }}
      >
        <Tab eventKey="mon-garage" title="Garage">
          <div id="tab-body">
            {key === "mon-garage" && <Garage />}
          </div>
        </Tab>
        <Tab eventKey="mon-profile" title="Mon profile">
          <div id="tab-body">
            {key === "mon-profile" && <ProfileInfo />}
          </div>
        </Tab>
        <Tab eventKey="mes-annonces" title="Annonces">
          <div id="tab-body">
            {key === "mes-annonces" && <MyOffers />}
          </div>
        </Tab>
        <Tab eventKey="reservations-recues" title="Réservation reçues">
          <div id="tab-body">
            {key === "reservations-recues" && <MyBookings consumer={"received"} />}
          </div>
        </Tab>
        <Tab eventKey="reservations-envoyees" title="Réservations envoyées">
          <div id="tab-body">
            {key === "reservations-envoyees" && <MyBookings consumer={"sent"} />}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile
