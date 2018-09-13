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
        visible={this.state.clicked}
        onClick={() => this.performAction(icon)}
      />
    );
  }
  render() {
    return (
      <InlineBlockContainer>
        {this.state.rows.map(r => {
          if (this.state.activeRows.indexOf(r) !== -1) {
            return <Row key={r}>{this.createRandomElement()}</Row>;
          } else return <Row key={r} />;
        })}
      </InlineBlockContainer>
    );
  }
}

export default Game;
