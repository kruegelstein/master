import React, { Component } from "react";
import Pressure from "pressure";

import { theme } from "../../constants/Theme.js";

// Styled componets
import GameComp from "./Game.js";
import Element from "./Element.js";
import Row from "../general/Row.js";
import Button from "../general/Button.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";

// Sounds
import beep from "../../sounds/Beep.mov";

// Helper
import { getTime } from "../../utils/helper.js";

// Interval to adapt is 15sec
const ADAPTION_INTERVAL = 10000;
const ELEMENTS_INTERVAL = 3000;

class Game extends Component {
  constructor(props) {
    super(props);
    this.elementInterval = null;
    this.adaptationInterval = null;
  }
  state = {
    gameStarted: false,
    numberOfActivesRows: 1,
    elements: [],
    activeRows: [],
    rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    clicks: []
  };

  componentDidMount() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
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
  }

  changeElements = () => {
    const activeRows = [Math.floor(Math.random() * 12)];
    this.setState({
      activeRows: activeRows,
      elements: this.state.elements.concat([this.createRandomElement()])
    });
  };

  start = () => {
    this.play();
    this.setState({ gameStarted: true });
    this.elementInterval = setInterval(this.changeElements, ELEMENTS_INTERVAL);
    this.adaptationInterval = setInterval(
      this.triggerAdaptation,
      ADAPTION_INTERVAL
    );
  };

  componentWillUnmount() {
    clearInterval(this.elementInterval);
    clearInterval(this.adaptationInterval);
  }

  triggerAdaptation = () => {
    this.play();
    // Save results for the round
    this.saveResults();
    // Stop adapting after 10 rounds
    if (this.props.round === 10 || this.rollback) {
      this.props.goToResults();
      clearInterval(this.elementInterval);
      clearInterval(this.adaptationInterval);
      return;
    }
  };

  saveResults = () => {
    this.saveRound(this.state);
    this.setState({
      clicks: []
    });
  };

  saveRound = state => {
    const clicks = state.clicks;
    const round = this.props.round;
    let dimensionProperty;
    switch (this.props.dimension) {
      case "Speed":
        dimensionProperty = "mops";
        break;
      case "Object clarity":
        dimensionProperty = "mops";
        break;
      case "Incentives":
        dimensionProperty = "mops";
        break;
      case "Content":
        dimensionProperty = "mops";
        break;
      default:
        null;
    }
    this.props.onSaveRound(round, clicks, dimensionProperty);
  };

  play = () => {
    const video = document.getElementById("video");
    video.play();
  };

  performAction = () => {
    this.setState({ elements: [] });
  };

  createRandomElement = () => {
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const id = Math.floor(Math.random() * 1000);
    return (
      <Element
        id={id}
        icon={iconValue}
        onClick={() => this.performAction()}
        visible={true}
      />
    );
  };
  render() {
    if (!this.props.isResults) {
      return (
        <GameComp id="element" userId={this.props.userId}>
          {this.state.rows.map((row, key) => {
            if (this.state.activeRows.indexOf(row) !== -1) {
              return (
                <Row key={key}>
                  {this.state.elements !== [] ? this.state.elements[0] : null}
                </Row>
              );
            } else return <Row key={row} />;
          })}
          {!this.state.gameStarted ? (
            <Button middle onClick={() => this.start()}>
              Start!
            </Button>
          ) : null}
          <video id="video" src={beep} style={{ height: 0, width: 0 }} />
        </GameComp>
      );
    }
    return null;
  }
}

export default Game;
