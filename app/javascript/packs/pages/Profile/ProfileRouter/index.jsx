import React, { useState } from "react";
import Garage from "../Garage";
import MyBookings from "../MyBookings";
import MyOffers from "../MyOffers";

import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ProfileRouter = () => {

  return (
    <Router>
      <Switch>
        <Route path="/mon-compte/mon-garage">
          <Garage />
        </Route>
        <Route path="/mon-compte/mes-annonces">
          <MyOffers />
        </Route>
        <Route path="/mon-compte/reservations-recues">
          <MyBookings consumer={"received"} />
        </Route>
        <Route path="/mon-compte/reservations-envoyees">
          <MyBookings consumer={"sent"} />
        </Route>
      </Switch>
    </Router>
  );
};

export default ProfileRouter;
