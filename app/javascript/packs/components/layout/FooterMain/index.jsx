import "./index.scss";
import React from "react";

const FooterMain = () => {
  return (
    <footer id="main-footer">
      <div className="container">
        <div id="col-1">
          <p className="footer-title">Easy Riding</p>
          <p><a href="#">GitHub</a></p>
        </div>
        <div id="col-2">
          <p className="contributors">Contributeurs</p>
          <p><a href="#">Boris Alföldi</a></p>
          <p><a href="#">Lucas Gautier</a></p>
          <p><a href="#">Maxime Castillo</a></p>
          <p><a href="#">Stéphane Ravoninjatovo</a></p>
        </div>
        <div id="col-3">
        <p><a href="#">Conditions générales d'utilisation</a></p>
        <p className="credits-title">© 2020 Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
