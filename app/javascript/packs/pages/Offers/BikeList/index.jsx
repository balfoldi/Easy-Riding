import "./index.scss";
import React from "react";
import BikeCard from "./BikeCard";
import { Row } from "react-bootstrap";

const BikeList = ({ offers }) => {
  return (
    <Row className="justify-content-md-center" >
      {offers?.map((offer, idx) => (
          <BikeCard offer={offer} key={idx} />
        ))}
    </Row>
  );
};

export default BikeList;
