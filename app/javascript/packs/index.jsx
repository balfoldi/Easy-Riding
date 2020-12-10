import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import NavMain from "./components/NavMain";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import FooterMain from "./components/FooterMain";
import BreadCrumb from "./components/BreadCrumb";

const App = () => {
  return (
    <div>
      <NavMain />
      <SignupForm />
      <FooterMain />
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
