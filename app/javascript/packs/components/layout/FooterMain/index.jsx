import "./index.scss";
import React from "react";

const FooterMain = () => {
  return (
    <div id="main-footer-container">
      <footer id="main-footer">
        <div className="container">
          <div id="col-1">
            <p className="footer-title">Easy Riding</p>
            <p><a className="light_text" href="https://github.com/balfoldi/Easy-Riding">Repository GitHub</a></p>
          </div>
          <div id="col-2">
            <p className="contributors">Contributeurs</p>
            <p><a style={{display: "table-cell"}} href="https://github.com/balfoldi" target="_blank">Boris Alföldi</a></p>
            <p><a style={{display: "table-cell"}}  href="https://github.com/RigateStudio" target="_blank">Lucas Gautier</a></p>
            <p><a style={{display: "table-cell"}} href="https://github.com/TonyStark992" target="_blank">Maxime Castillo</a></p>
            <p><a style={{display: "table-cell"}} href="https://github.com/hsravo" target="_blank">Stéphane Ravoninjatovo</a></p>
          </div>
          <div id="col-3">
            <p className="contributors">Conditions générales d'utilisation</p>
            <p><a href="#">Consulter ici</a></p>
            <p className="credits-title">© 2020 Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterMain;
