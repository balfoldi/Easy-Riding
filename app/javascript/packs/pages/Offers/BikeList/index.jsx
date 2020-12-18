import "./index.scss";
import React from "react";
import BikeCard from "./BikeCard";
import { Row } from "react-bootstrap";

const BikeList = ({ offers }) => {
  return (
    <Row className="justify-content-md-center" >
      {offers?.slice(0,20).map((offer, idx) => (
          <BikeCard offer={offer} offers={offers} key={idx} />
        ))}
    </Row>
  );
};

export default BikeList;
