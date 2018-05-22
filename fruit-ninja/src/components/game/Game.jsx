import React, { Component } from "react";

// Styled componets
import Element from "./Element.js";
import Row from "../general/Row.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";

class Game extends Component {
  render() {
    return (
      <InlineBlockContainer>
        <Row>
          <Element />
        </Row>
        <Row>
          <Element />
        </Row>
        <Row>
          <Element />
        </Row>
        <Row>
          <Element />
        </Row>
        <Row>
          <Element />
        </Row>
        <Row>
          <Element />
        </Row>
        <Row>
          <Element />
        </Row>
      </InlineBlockContainer>
    );
  }
}

export default Game;
