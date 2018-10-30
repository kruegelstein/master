import React, { Component } from "react";

import { theme } from "../../constants/Theme.js";

// Styled componets
import Element from "./Element.js";
import Row from "../general/Row.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";

class Game extends Component {
  state = {
    activeRows: [],
    rows: [0, 1, 2, 3, 4, 5]
  };

  changeElements() {
    const activeRows = [Math.floor(Math.random() * 7)];
    this.setState(prevState => ({
      activeRows: activeRows
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.changeElements(), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  performAction(icon) {
    switch (icon) {
      case "tennis":
        console.log("CLICKED");
        break;
      case "basketball":
        console.log("CLICKED");
        break;
      case "volleyball":
        console.log("CLICKED");
        break;
      case "soccer":
        console.log("CLICKED");
        break;
      case "football":
        console.log("CLICKED");
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
        visible={this.state.clicked}
        onClick={() => this.performAction(icon)}
      />
    );
  }
  render() {
    return (
      <InlineBlockContainer>
        {this.state.rows.map(row => {
          if (this.state.activeRows.indexOf(row) !== -1) {
            return <Row key={row}>{this.createRandomElement()}</Row>;
          } else return <Row key={row} />;
        })}
      </InlineBlockContainer>
    );
  }
}

export default Game;
