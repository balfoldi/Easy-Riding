import "./index.scss";
import React, { useState } from "react";
import logo from "./logo.png";
import { ScrollTo, ScrollArea } from "react-scroll-to";

const HeaderImage = () => {
  return (
    <section className="HeaderImage">
      <ScrollTo>
        {({ scroll }) => (
          <img className="HeaderImage__logo" src={logo}
          onClick={() => scroll({ x: 20, y: 800, smooth: true })}/>
        )}
      </ScrollTo>

    </section>
  )
}

export default HeaderImage
