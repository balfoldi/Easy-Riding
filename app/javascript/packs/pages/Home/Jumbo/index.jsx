import "./index.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button, Container } from "react-bootstrap";
import SearchMap from "./SearchMap";

const Jumbo = () => {
  return (
    <Jumbotron fluid id="jumbotron">
      <div id="info">
        <p id="presentation">Visiter la France sur la moto de mes rêves{"\u00a0"}?</p>
        <Link to="/annonces" id="home-link">
          <Button className="ButtonHomepage" variant="contained" id="home-button">
            <span>C'est parti</span>
          </Button>
        </Link>
      </div>
      <div id="map">
        <SearchMap />
      </div>
    </Jumbotron>
  );
};

export default Jumbo;
