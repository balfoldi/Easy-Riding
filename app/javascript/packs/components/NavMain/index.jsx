import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown, Button } from "react-bootstrap";
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
          <Navbar.Brand id="title-main" href="#">
            Easy Riding
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav id="right-align">
              <Nav className="mr-auto">
                <NavDropdown title="Menu" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#">Mon Profil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Mon Garage</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Mes Annonces</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Mes Réservations</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Mes Favoris</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={disconnectUser} className="auth-links" href="#">
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
          <Navbar.Brand id="title-main" href="#">
            Easy Riding
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
      );
    }
  };
  return navBar();
};

export default NavMain;
