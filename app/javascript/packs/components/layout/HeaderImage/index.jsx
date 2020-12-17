import "./index.scss";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { ScrollTo } from "react-scroll-to";

const HeaderImage = () => {
  return (
    <section className="HeaderImage">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <ScrollTo>
            {({ scroll }) => (
              <div className="HeaderImage__arrow HeaderImage arrow"
              onClick={() => scroll({ x: 0, y: 800, smooth: true })}><span></span><span></span><span></span></div>
            )}
          </ScrollTo>
        </Col>
      </Row>
    </section>
  )
}

export default HeaderImage
