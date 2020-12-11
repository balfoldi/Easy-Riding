import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import "./navmain.scss";
import HeaderImage from "../ImageOverNavbar";

const NavMain = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const connectUser = () => {
    setIsAuthenticated(true);
  };

  const disconnectUser = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <React.Fragment >
        <HeaderImage />
          <Navbar id="nav-main" collapseOnSelect expand="lg">
            <Navbar.Brand id="title-main" href="#">
            <Link to='/'>Easy Riding</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav id="right-align">
              <Nav className="mr-auto">
                <NavDropdown title="Menu" id="collasible-nav-dropdown">
                    <Link to='/mon-compte' id="item-link">MON COMPTE</Link>
                  <NavDropdown.Divider />
                    <Link to='/mon-compte/mon-garage' id="item-link">Mon Garage</Link>
                  <NavDropdown.Divider />
                  <Link to='/mon-compte/mes-annonces' id="item-link">Mes Annonces</Link>
                  <NavDropdown.Divider />
                    <Link to='/mon-compte/mes-réservations' id="item-link">Mes Réservations</Link>
                  <NavDropdown.Divider />
                    <Link to='/mon-compte/mes-favoris' id="item-link">Mes Favoris</Link>
                </NavDropdown>
                <Nav.Link onClick={disconnectUser} className="auth-links">
                  Déconnexion
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </React.Fragment>
    );
  } return (
   <React.Fragment >
    <HeaderImage />
      <Navbar id="nav-main" collapseOnSelect expand="lg">
        <Navbar.Brand id="title-main" href="#">
          <Link to='/'>Easy Riding</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="right-align">
            <Nav.Link onClick={connectUser} className="auth-links" href="#">
              Connexion
            </Nav.Link>
            <Nav.Link className="auth-links" href="#pricing">
              Inscription
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavMain;
