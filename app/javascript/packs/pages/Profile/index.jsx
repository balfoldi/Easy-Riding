import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavProfile from "./NavProfile";
import Favorites from "./Favorites";
import ProfileInfo from "./ProfileInfo"
import Garage from "./Garage";
import MyOffers from "./MyOffers";
import MyBookings from "./MyBookings";
import NotFound from "../pages/NotFound";

const Profile = () => {
  return (
    <Router>
    <h2>Page Profile en cours de construction...</h2>
    <NavProfile />
      <Switch>
        <Route exact path="/mon-compte" component={ProfileInfo} />
        <Route path="/mon-compte/mon-garage" component={Garage} />
        <Route path="/mon-compte/mes-annonces" component={MyOffers} />
        <Route path="/mon-compte/mes-favoris" component={Favorites} />
        <Route path="/mon-compte/mes-réservations" component={MyBookings} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Profile
