import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import "./navmain.scss";

const NavMain = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const connectUser = () => {
    setIsAuthenticated(true);
  };

  const disconnectUser = () => {
    setIsAuthenticated(false);
  };

  const navBar = () => {
    if (isAuthenticated) {
      return (
        <Navbar id="nav-main" collapseOnSelect expand="lg">
          <Navbar.Brand id="title-main">
            <Link to='/'>Easy Riding</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav id="right-align">
              <Nav className="mr-auto">
                <NavDropdown title="Menu" id="collasible-nav-dropdown">
                  <NavDropdown.Item><Link to='/mon-compte'>Mon Profil</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Mon Garage</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Mes Annonces</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Mes Réservations</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Mes Favoris</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={disconnectUser} className="auth-links">
                  Déconnexion
                </Nav.Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar id="nav-main" collapseOnSelect expand="lg">
          <Navbar.Brand id="title-main">
            <Link to='/'>Easy Riding</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav id="right-align">
              <Nav.Link onClick={connectUser} className="auth-links">
                Connexion
              </Nav.Link>
              <Nav.Link className="auth-links">
                Inscription
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  };
  return navBar();
};

export default NavMain;
