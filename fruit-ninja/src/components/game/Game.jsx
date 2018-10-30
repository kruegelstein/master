import React, { Component } from "react";
import Pressure from "pressure";

import { theme } from "../../constants/Theme.js";

// Styled componets
import Element from "./Element.js";
import Row from "../general/Row.js";
import Button from "../general/Button.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";

// Sounds
import beep from "../../sounds/Beep.mov";

// Helper
import { getTime } from "../../utils/helper.js";

// Interval to adapt is 15sec
const ADAPTION_INTERVAL = 15000;
const ELEMENTS_INTERVAL = 4000;

class Game extends Component {
  constructor(props) {
    super(props);
    this.elementInterval = null;
    this.adaptationInterval = null;
  }
  state = {
    gameStarted: false,
    activeRows: [],
    rows: [0, 1, 2, 3, 4, 5],
    clicks: []
  };

  componentDidMount() {
    Pressure.set("#element", {
      start: event => {
        const clickId = this.state.clicks.length;
        const clickStart = Date.now();
        let clickInfo;
        let xCoordinate;
        let yCoordinate;
        if (event.touches.length === 1) {
          const touch = event.touches[0];
          xCoordinate = touch.clientX;
          yCoordinate = touch.clientY;
          clickInfo = {
            id: clickId,
            x: xCoordinate,
            y: yCoordinate,
            clickStart
          };
        }
        const oldClicks = this.state.clicks;
        const newClick = [clickInfo];
        const clicks = oldClicks.concat(newClick);
        this.setState({
          clicks
        });
      },
      change: (force, event) => {
        const currentClick = this.state.clicks[this.state.clicks.length - 1];
        currentClick.force = force;
      },
      end: () => {
        const currentClick = this.state.clicks[this.state.clicks.length - 1];
        const clickEnd = Date.now();
        const clickStart = currentClick.clickStart;
        const clickDuration = getTime(clickStart, clickEnd);
        currentClick.clickEnd = clickEnd;
        currentClick.duration = clickDuration;
      }
    });
  }

  changeElements = () => {
    const activeRows = [Math.floor(Math.random() * 7)];
    this.setState(prevState => ({
      activeRows: activeRows
    }));
  };

  start = () => {
    this.play();
    this.setState({ gameStarted: true });
    this.elementInterval = setInterval(this.changeElements, ELEMENTS_INTERVAL);
    this.adaptionInterval = setInterval(
      this.triggerAdaptation,
      ADAPTION_INTERVAL
    );
  };

  componentWillUnmount() {
    clearInterval(this.elementInterval);
    clearInterval(this.adaptionInterval);
  }

  triggerAdaptation = () => {
    this.play();
  };

  play = () => {
    const video = document.getElementById("video");
    video.play();
  };

  performAction = icon => {
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
  };

  createRandomElement = () => {
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
  };
  render() {
    return (
      <InlineBlockContainer id="element">
        {this.state.rows.map(row => {
          if (this.state.activeRows.indexOf(row) !== -1) {
            return <Row key={row}>{this.createRandomElement()}</Row>;
          } else return <Row key={row} />;
        })}
        {!this.state.gameStarted ? (
          <Button middle onClick={() => this.start()}>
            Start!
          </Button>
        ) : null}
        <video id="video" src={beep} style={{ height: 0, width: 0 }} />
      </InlineBlockContainer>
    );
  }
}

export default Game;
