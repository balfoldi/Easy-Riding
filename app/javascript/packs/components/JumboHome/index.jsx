import React from 'react';
import {Jumbotron, Button, Image} from "react-bootstrap";
import "./jumbohome.scss";
import France from "../../assets/img/france.png";

const JumboHome = () => {
  return (
    <Jumbotron fluid id="jumbotron">
      <div id="info">
        <p id="presentation">Visiter la France sur la moto de mes rêves ? </p>
        <Button id="home-button">C'est parti</Button>
      </div>
      <div id="map">
        <Image src={France} />
      </div>
    </Jumbotron>
  )
}

export default JumboHome;
