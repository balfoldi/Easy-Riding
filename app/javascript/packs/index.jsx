import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import NavMain from "./components/NavMain";
import FooterMain from "./components/FooterMain";

const App = () => {
  return (
    <Router>
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mon-compte" component={Profile} />
        <Route path="/annonces" component={Offers} />
      </Switch>
      <div>
        <FooterMain />
      </div>
    </Router>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
