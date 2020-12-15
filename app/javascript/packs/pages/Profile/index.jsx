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
import Offers from "../Offers";

const Profile = () => {
  return (
    <div id="profile-container" >
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
    </div>
  )
}

export default Profile
