import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavProfile from "../components/NavProfile";
import ProfileInfo from "../components/ProfileInfo"
import Garage from "../components/Garage";
import MyOffers from "../components/MyOffers";
import Favorites from "../components/Favorites";
import MyBookings from "../components/MyBookings";
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
