import "./index.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Favorites from "./Favorites";
import Garage from "./Garage";
import MyBookings from "./MyBookings";
import MyOffers from "./MyOffers";
import NavProfile from "./NavProfile";
import ProfileInfo from "./ProfileInfo"
import NotFound from "../NotFound";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Container } from "react-bootstrap";


const Profile = () => {
  return (
    <div id="body">
      <React.Fragment>
        <Container >
          <Breadcrumb className="breadcrumb">
            <div id="Introductionphrase">Vous etes ici :</div>
            <Breadcrumb.Item href="/" className="ml-2 breadcrumb_link">Accueil</Breadcrumb.Item>
            <Breadcrumb.Item active className="color breadcrumb_link">Mon compte</Breadcrumb.Item>
          </Breadcrumb>
          <Router>
          <h2>Page Profile en cours de construction...</h2>
          <NavProfile />
            <Switch>
              <Route exact path="/mon-compte" component={ProfileInfo} />
              <Route path="/mon-compte/mon-garage" component={Garage} />
              <Route path="/mon-compte/mes-annonces" component={MyOffers} />
              <Route path="/mon-compte/mes-favoris" component={Favorites} />
              <Route path="/mon-compte/mes-reservations" component={MyBookings} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default Profile
