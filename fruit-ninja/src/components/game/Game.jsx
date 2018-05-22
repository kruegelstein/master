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
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
        <Row>
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
        <Row>
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
        <Row>
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
        <Row>
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
        <Row>
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
        <Row>
          <Element onClick={() => this.props.onLoseLive()} />
        </Row>
      </InlineBlockContainer>
    );
  }
}

export default Game;
