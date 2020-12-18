import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import authStore from "../../stores/Auth";

const PrivateRoute = ({ component: ChildComponent, ...otherProps }) => {
  const { isLogged } = authStore;

  return (
    <Route {...otherProps} render={(props) => (
      isLogged ?
        <ChildComponent {...props} /> :
        <Redirect to = "/connexion" />
    )} />
  )
}

export default observer(PrivateRoute);
