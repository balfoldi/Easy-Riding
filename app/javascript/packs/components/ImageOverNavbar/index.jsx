import "./index.scss";
import React, { useState } from "react";
import logo from "./logo.png";

const HeaderImage = () => {
  return (
    <section className="HeaderImage">
        <img className="HeaderImage__logo" src={logo}/>
    </section>
  )
}

export default HeaderImage
