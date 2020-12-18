import "./index.scss";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { ScrollTo } from "react-scroll-to";

const HeaderImage = () => {
  return (
    <section className="HeaderImage">
      <Row className="d-flex flex-column mb-3">
        <Col div="Box_en_haut">
          <div id="Titre_Homepage">Easy Riding</div>
          <div id="Headline_Homepage">Louez une moto,
          partez à l'aventure.</div>
        </Col>
        <Col div="Box_en_bas" md="auto">
        <p> BAS</p>

          <ScrollTo>
            {({ scroll }) => (
              <div className="arrow"
              onClick={() => scroll({ x: 0, y: 800, smooth: true })}><span></span><span></span><span></span></div>
            )}
          </ScrollTo>
        </Col>
      </Row>
    </section>
  )
}

export default HeaderImage
