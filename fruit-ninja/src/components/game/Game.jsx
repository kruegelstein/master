import React, { Component } from "react";

import { theme } from "../../constants/Theme.js";

// Styled componets
import Element from "./Element.js";
import Row from "../general/Row.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";

class Game extends Component {
  performAction() {}
  createRandomElement() {
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 10)];
    const iconValue = icons[icon];
    return <Element icon={iconValue} onClick={() => this.props.onLoseLive()} />;
  }
  render() {
    return (
      <InlineBlockContainer>
        <Row>{this.createRandomElement()}</Row>
        <Row>{this.createRandomElement()}</Row>
        <Row>{this.createRandomElement()}</Row>
        <Row>{this.createRandomElement()}</Row>
        <Row>{this.createRandomElement()}</Row>
        <Row>{this.createRandomElement()}</Row>
        <Row>{this.createRandomElement()}</Row>
      </InlineBlockContainer>
    );
  }
}

export default Game;
