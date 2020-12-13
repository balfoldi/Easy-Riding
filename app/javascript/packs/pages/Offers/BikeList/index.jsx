import React from "react";
import { Container, FormControl, Col, Row, Button, Form, Group } from "react-bootstrap";

import Breadcrumb from "../../../components/layout/BreadCrumb";
import SearchBar from "../SearchBar";
import AsideBar from "../AsideBar";

const Offers = () => {
  return (
      <React.Fragment>
        <Breadcrumb />
        <SearchBar />
        <Container>
          <Row>
            <Col sm={4}>
              <br></br>
              <AsideBar />
            </Col>
            <Col sm={8}>
              <br></br>
              <BikeList />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
};

export default Offers;

