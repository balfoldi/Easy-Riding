import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import NavMain from "./components/NavMain";
import FooterMain from "./components/FooterMain";
import BreadCrumb from "./components/BreadCrumb";
import { ScrollTo, ScrollArea } from "react-scroll-to";

const App = () => {
  return (
    <div>
      <NavMain />
      <BreadCrumb />
      <Home />
      <ScrollTo className="ScrollSomewhere">
        {({ scroll }) => (
          <button onClick={() => scroll({ x: 10, y: 0, smooth: true })}>Scroll to top</button>
        )}
      </ScrollTo>
      <FooterMain />
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
