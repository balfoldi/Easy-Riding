import "./index.scss";
import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BikeList from "./BikeList";
import useGetData from "../../hooks/useGetData";
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

const Offers = () => {
  const [input, setInput] = useState({
    model: '',
    region: "all",
    companyName: "all",
    bodyType: "all"
  });
  const [allOffers, setAllOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const { isLoading, data: offersData } = useGetData('offers');

  useEffect(() => {
    setAllOffers(offersData);
  }, [offersData]);

  useEffect(() => {
    filterOffers()
  }, [allOffers])

  const filterOffers = () => {
    const checkModel = (offer) => offer.bike.model.toLowerCase().startsWith(input.model.toLowerCase()) || input.model === ""
    const checkcompanyName = (offer) => offer.bike.company_name === input.companyName || input.companyName === "all"
    const checkbodyType = (offer) => offer.bike.body_type === input.bodyType || input.bodyType === "all"
    const checkRegion = (offer) => offer.region === input.region || input.region === "all"
    setFilteredOffers(allOffers?.filter((offer) => checkModel(offer) && checkcompanyName(offer) && checkbodyType(offer) && checkRegion(offer))
    )
  }

  return (
    <>
      <SearchBar input={input} setInput={setInput} offers={allOffers} />
      {isLoading ? (
        <div>
          <UseAnimations
            className="loading"
            animation={loading}
            size={100}
          />
        </div>
      ) : (
          <Container>
            <Row>
              <Col>
                <BikeList offers={filteredOffers} />
              </Col>
            </Row>
          </Container>
        )}
    </>
  );
};

export default Offers;
