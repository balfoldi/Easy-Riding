import './index.scss';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import ScrollToTop from "react-scroll-to-top";
import HeaderImage from "./components/layout/HeaderImage";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router >
      <div id="page-container">
        <div id="content-wrap">
          <Switch>
            <Route exact path="/" component={HeaderImage} />
          </Switch>
          <NavMain />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/mon-compte" component={Profile} />
            <Route path="/annonces" component={Offers} />
            <Route path="/annonce" component={Offer} />
            <Route path="/connexion" component={Login} />
            <Route path="/inscription" component={Signup} />
            <Route path="/conditions-générales-d-utilisation" component={TermsOfService} />
            <Route component={NotFound} />
          </Switch>
          </div>
          <ScrollToTop smooth color="#c9c9c9" />
        <FooterMain id="footerdown"/>
      </div>
    </Router>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
