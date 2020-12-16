import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Image } from "react-bootstrap";
import France from "./france.png";

const Jumbo = () => {
  return (
      <Jumbotron fluid id="jumbotron">
        <div id="info">
          <p id="presentation">Visiter la France sur la moto de mes rêves ? </p>
          <Link to="/annonces" id="home-link">
            <Button className="ButtonHomepage" variant="contained" id="home-button"><span>C'est parti</span></Button>
          </Link>
        </div>
        <RegionsDeFrance />
        <div id="map">
          <Image src={France} />
        </div>
      </Jumbotron>
  )
}

export default Jumbo;
