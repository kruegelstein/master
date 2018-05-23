import React, { Component } from "react";

import { theme } from "../../constants/Theme.js";

// Styled componets
import Element from "./Element.js";
import Row from "../general/Row.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";

class Game extends Component {
  performAction(icon) {
    switch (icon) {
      case "skull":
        this.props.onLoseLive();
        break;
      case "dynamite":
        this.props.onLoseLive();
        break;
      case "bomb":
        this.props.onLoseLive();
        break;
      case "biohazard":
        this.props.onLoseLive();
        break;
      case "heart":
        this.props.onGainLive();
        break;
      case "tennis":
        this.props.onAddPoint();
        break;
      case "basketball":
        this.props.onAddPoint();
        break;
      case "volleyball":
        this.props.onAddPoint();
        break;
      case "soccer":
        this.props.onAddPoint();
        break;
      case "football":
        this.props.onAddPoint();
        break;
      default:
        return;
    }
  }

  createRandomElement() {
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 10)];
    const iconValue = icons[icon];
    return (
      <Element
        id={icon}
        icon={iconValue}
        onClick={() => this.performAction(icon)}
      />
    );
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
