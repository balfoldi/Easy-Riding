import "./index.scss";
import OfferShow from "../Profile/MyOffers/OfferShow";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

const Offer = () => {
  const [offer, setOffer] = useState(false);

  window.location.href.split("/").pop();
  console.log();

  const fetchMyOffers = () => {
    fetch(`/api/offers/${window.location.href.split("/").pop()}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setOffer(response);
      });
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  return <Container>{offer && <OfferShow offer={offer} consumer={true} />}</Container>;
};

export default Offer;
