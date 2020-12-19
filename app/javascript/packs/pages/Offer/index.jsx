import "./index.scss";
import OfferShow from "../Profile/MyOffers/OfferShow";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";

const Offer = () => {
  const [offer, setOffer] = useState(false);
  const { isLoading, data: offerData } = useGetData(`offers/${window.location.href.split("/").pop()}`)

  useEffect(() => {
    setOffer(offerData)
  }, [isLoading]);

  return <Container>{offer && <OfferShow offer={offer} consumer={true} />}</Container>;
};

export default Offer;
