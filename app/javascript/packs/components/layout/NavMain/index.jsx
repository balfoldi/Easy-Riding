import "./index.scss";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from 'mobx-react';
import authStore from '../../../stores/Auth';
import { Nav, Navbar, NavDropdown, Dropdown, Alert } from "react-bootstrap";

const NavMain = () => {
  const { logout, error, isLogged } = authStore;

  return (
    <div id="nav-main-container">
      <Navbar id="nav-main" collapseOnSelect expand="lg">
        <Navbar.Brand id="title-main" href="#">
          <Link className="logo" to="/">Easy Riding</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {isLogged &&
            <Nav id="right-align">
              <Nav className="mr-auto">
                <NavDropdown title="Menu" id="collasible-nav-dropdown">
                  <Dropdown.Item as={NavLink} exact to="/mon-compte" id="item-link">
                    MON COMPTE
                  </Dropdown.Item>
                  <NavDropdown.Divider />

                  <Dropdown.Item as={NavLink} to="/mon-compte/mon-garage" id="item-link">
                    Mon Garage
                  </Dropdown.Item>
                  <NavDropdown.Divider />

                  <Dropdown.Item as={NavLink} to="/mon-compte/mes-annonces" id="item-link">
                    Mes Annonces
                  </Dropdown.Item>
                  <NavDropdown.Divider />

                  <Dropdown.Item as={Link} to="/mon-compte/mes-reservations" id="item-link">
                    Mes Réservations
                  </Dropdown.Item>
                  <NavDropdown.Divider />

                  <Dropdown.Item as={NavLink} to="/mon-compte/mes-favoris" id="item-link">
                    Mes Favoris
                  </Dropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={logout} className="auth-links">
                  Déconnexion
                </Nav.Link>
              </Nav>
            </Nav>
          }

          {!isLogged &&
            <Nav id="right-align">
              <Nav.Link as={NavLink} to="/connexion" className="auth-links">
                Connexion
              </Nav.Link>

              <Nav.Link as={NavLink} to="/inscription" className="auth-links">
                Inscription
              </Nav.Link>
            </Nav>
          }

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default observer(NavMain);
