import React from "react";
import { Container, Col, Row, } from "react-bootstrap";

import Breadcrumb from "../../components/layout/BreadCrumb";
import SearchBar from "./SearchBar";
import AsideBar from "./AsideBar";
import BikeList from "./BikeList";
import BikeCard from "./BikeList/BikeCard";

const Offers = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <BikeCard />
      </Container>
    </React.Fragment>
  )
};

export default Offers;
