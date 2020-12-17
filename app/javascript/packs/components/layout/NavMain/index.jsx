import "./index.scss";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from 'mobx-react';
import authStore from '../../../stores/Auth';
import { Nav, Navbar, Container } from "react-bootstrap";

const NavMain = () => {
  const { logout, isLogged } = authStore;

  return (
    <Container >
      <Navbar id="nav-main" collapseOnSelect expand="lg">
        <Navbar.Brand id="title-main">
          <Link className="logo" to="/">Easy Riding</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {isLogged &&
            <Nav id="right-align">
              <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/mon-compte/mon-garage" id="item-link">
                  Mon Compte
                </Nav.Link>
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
    </Container>
  );
};

export default observer(NavMain);
