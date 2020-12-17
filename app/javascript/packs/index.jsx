import './index.scss';
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavMain from "./components/layout/NavMain";
import NotFound from "./pages/NotFound";
import FooterMain from "./components/layout/FooterMain";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import TermsOfService from './pages/TermsOfService';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import authStore from './stores/Auth';
import ScrollToTop from "react-scroll-to-top";
import HeaderImage from "./components/layout/HeaderImage";

const App = () => {
  const { autoLogin } = authStore;

  const reconnectUser = () => {
    const userToken = Cookies.get("EasyRidingUserToken");
    if (userToken) {
      let userId = jwt_decode(userToken).sub;
      autoLogin(userId, userToken);
    }
  };

  useEffect(() => {
    reconnectUser();
  }, []);

  return (
    <Router>
        <Switch>
              <Route exact path="/" component={HeaderImage} />
        </Switch>
      <NavMain />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/mon-compte" component={Profile} />
            <Route path="/annonces" component={Offers} />
            <Route path="/connexion" component={Login} />
            <Route path="/inscription" component={Signup} />
            <Route path="/conditions-générales-d-utilisation" component={TermsOfService} />
            <Route component={NotFound} />
          </Switch>
        <ScrollToTop smooth color="#c9c9c9" />
      <FooterMain />
    </Router>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
