import React, { Component } from "react";

import { theme } from "../../../constants/Theme.js";

// Styled componets
import ElementComp from "./Element.js";

// Helper
import { getOpacity, getSpeed } from "../../../utils/helper.js";

class Element extends Component {
  state = { clicked: false };
  componentDidMount = () => {
    this.checkForAnimationEnd();
  };

  checkForAnimationEnd = () => {
    const element = document.getElementById("animation");
    element.addEventListener("animationend", () => {
      this.props.missElement(this.props.elementId);
    });
  };
  clickElement() {
    this.setState({ clicked: true });
    this.props.hitElement(this.props.elementId);
    if (this.props.dimension === "Incentives") {
      this.props.toggleIncentives(this.props.isIncentiveActive);
      setTimeout(() => {
        this.props.toggleIncentives(this.props.isIncentiveActive);
      }, 500);
    }
  }

  render() {
    const { dimension, round, rollback } = this.props;
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const id = Math.floor(Math.random() * 1000);
    const yCoordinate =
      dimension === "Content" ? Math.floor(Math.random() * 200) : 0;
    const opacity =
      dimension === "Object clarity" ? getOpacity(round, rollback) : 1;
    const speed = dimension === "Speed" ? getSpeed(round, rollback) : 2.5;
    const delay = Math.floor(Math.random() * 250);

    return (
      <ElementComp
        key={id}
        id="animation"
        src={iconValue}
        onClick={() => this.clickElement(this.props.key)}
        opacity={opacity}
        speed={speed}
        yCoordinate={yCoordinate}
        xCoordinate={this.props.xCoordinate}
        clicked={this.state.clicked}
      />
    );
  }
}

export default Element;
