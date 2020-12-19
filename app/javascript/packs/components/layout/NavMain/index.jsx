import "./index.scss";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from 'mobx-react';
import authStore from '../../../stores/Auth';
import { Nav, Navbar, Container, Button } from "react-bootstrap";

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
                <Nav.Link onClick={logout} className="auth-links">
                <Button variant="outline-dark" id="button-connexion">
                  Déconnexion
                </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/mon-compte/mon-garage" id="item-link">
                <Button variant="warning" className="btn-circle"> Mon Profil
                </Button>
                </Nav.Link>
              </Nav>
            </Nav>
          }

          {!isLogged &&
            <Nav id="right-align">
              <Nav.Link as={NavLink} to="/connexion" className="auth-links">
              <Button variant="outline-dark" id="button-connexion">
                Connexion
              </Button>
              </Nav.Link>

              <Nav.Link as={NavLink} to="/inscription" className="auth-links">
              <Button variant="primary" id="button-inscription">
                Inscription
                </Button>
              </Nav.Link>
            </Nav>
          }

        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default observer(NavMain);
