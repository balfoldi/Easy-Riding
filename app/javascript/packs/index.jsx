import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import NavMain from "./components/NavMain";
import FooterMain from "./components/FooterMain";
import BreadCrumb from "./components/BreadCrumb";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div>
      <NavMain />
      <LoginForm />
      <FooterMain />
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
