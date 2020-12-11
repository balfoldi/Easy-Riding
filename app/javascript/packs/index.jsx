import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import NavMain from "./components/NavMain";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import FooterMain from "./components/FooterMain";
import BreadCrumb from "./components/BreadCrumb";
import ScrollToTop from "react-scroll-to-top";

const App = () => {
  return (
    <Router>
      <NavMain />
      <BreadCrumb />
      <Home />
      <FooterMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mon-compte" component={Profile} />
        <Route path="/annonces" component={Offers} />
        <Route component={NotFound} />
      </Switch>
      <ScrollToTop/>
        <FooterMain />
    </Router>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
