import "./index.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap";

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
      <Navbar id="nav-main" collapseOnSelect expand="lg">
        <Navbar.Brand id="title-main">
          <Link to="/">Easy Riding</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="right-align">
            <Nav className="mr-auto">
              <NavDropdown title="Menu" id="collasible-nav-dropdown">
                <Dropdown.Item as={Link} to="/mon-compte" id="item-link">
                  MON COMPTE
                </Dropdown.Item>
                <NavDropdown.Divider />

                <Dropdown.Item as={Link} to="/mon-compte/mon-garage" id="item-link">
                  Mon Garage
                </Dropdown.Item>
                <NavDropdown.Divider />

                <Dropdown.Item as={Link} to="/mon-compte/mes-annonces" id="item-link">
                  Mes Annonces
                </Dropdown.Item>
                <NavDropdown.Divider />

                <Dropdown.Item as={Link} to="/mon-compte/mes-réservations" id="item-link">
                  Mes Réservations
                </Dropdown.Item>
                <NavDropdown.Divider />

                <Dropdown.Item as={Link} to="/mon-compte/mes-favoris" id="item-link">
                  Mes Favoris
                </Dropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={disconnectUser} className="auth-links">
                Déconnexion
              </Nav.Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  return (
    <Navbar id="nav-main" collapseOnSelect expand="lg">
      <Navbar.Brand id="title-main" href="#">
        <Link to="/">Easy Riding</Link>
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
};

export default NavMain;
