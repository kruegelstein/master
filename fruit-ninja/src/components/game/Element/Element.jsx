import React, { Component } from "react";

import { theme } from "../../../constants/Theme.js";

// Styled componets
import ElementComp from "./Element.js";

// Helper
import { getOpacity, getSpeed } from "../../../utils/helper.js";

class Element extends Component {
  state = {
    clicked: false
  };

  clickElement() {
    this.setState({ clicked: true });
  }

  render() {
    const { dimension, round, rollback } = this.props;
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const id = Math.floor(Math.random() * 1000);
    const opacity =
      dimension === "Object clarity" ? getOpacity(round, rollback) : 1;
    const speed = dimension === "Speed" ? getSpeed(round, rollback) : 2.5;
    return (
      <ElementComp
        key={id}
        id={id}
        src={iconValue}
        onClick={() => this.clickElement()}
        opacity={opacity}
        speed={speed}
        clicked={this.state.clicked}
      />
    );
  }
}

export default Element;