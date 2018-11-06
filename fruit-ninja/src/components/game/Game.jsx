import React, { Component } from "react";
import Pressure from "pressure";

import { theme } from "../../constants/Theme.js";

// Styled componets
import GameComp from "./Game.js";
import Element from "./Element.js";
import Row from "../general/Row.js";
import Button from "../general/Button.js";
import InlineBlockContainer from "../general/InlineBlockContainer.js";
import Incentive from "./Incentive.js";
import DashBoard from "../dashBoard/DashBoard.jsx";

// Sounds
import beep from "../../sounds/Beep.mov";

// Helper
import {
  getTime,
  getOpacity,
  getAdaptationScore,
  getIncentives,
  getSpeed
} from "../../utils/helper.js";

// Interval to adapt is 10sec
const ADAPTION_INTERVAL = 10000;
const ELEMENTS_INTERVAL = 3000;

class Game extends Component {
  constructor(props) {
    super(props);
    this.elementInterval = null;
    this.adaptationInterval = null;
    this.hits = 0;
    this.misses = 0;
    this.incentives = 10;
  }
  state = {
    gameStarted: false,
    numberOfActivesRows: 1,
    elements: [],
    activeRows: [],
    rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    clicks: [],
    isIncentiveActive: false,
    points: 0
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

    const newElements = [
      this.createRandomElement(
        this.props.round,
        this.props.dimension,
        this.props.rollback
      )
    ];
    // Push the new element to the state
    this.setState({
      activeRows: activeRows,
      elements: this.state.elements.concat(newElements)
    });
    // Delete the element after animation if it was not deleted by the user
    setTimeout(() => {
      if (this.state.elements.length > 0) {
        this.setState({
          elements: []
        });
        this.misses = this.misses + 1;
      }
    }, this.props.dimension === "Speed" ? getSpeed(this.props.round, this.props.rollback) * 1000 : 2500);
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
    const score = getAdaptationScore(this.hits, this.misses);
    // Save results for the round
    this.saveResults();
    // Stop adapting after 10 rounds
    if (this.props.round === 10 || this.props.rollback) {
      this.props.goToResults();
      clearInterval(this.elementInterval);
      clearInterval(this.adaptationInterval);
      return;
    }
    if (this.props.round < 3) {
      // first two rounds adapt for learning
      this.next(false);
      return;
    }
    if (score > 0) {
      // Positive score --> adapt
      this.next(false);
    } else {
      // Negative score --> Set rollback flag
      this.next(true);
    }
  };

  next(rollback) {
    if (rollback) {
      if (this.props.dimension === "Incentives") {
        this.incentives = this.incentives - 5;
      }
      this.props.onSetRollback();
    }
    if (this.props.dimension === "Incentives") {
      this.incentives = this.incentives + 10;
    }
    this.props.onNextRound();
  }

  saveResults = () => {
    this.saveRound(this.state);
    this.setState({
      clicks: []
    });
    this.hits = 0;
    this.misses = 0;
  };

  saveRound = state => {
    const hits = this.hits;
    const misses = this.misses;
    const clicks = state.clicks;
    const round = this.props.round;
    const rollback = this.props.rollback;
    let dimensionProperty;
    switch (this.props.dimension) {
      case "Speed":
        dimensionProperty = getSpeed(round, rollback);
        break;
      case "Object clarity":
        dimensionProperty = getOpacity(round, rollback);
        break;
      case "Incentives":
        dimensionProperty = this.incentives;
        break;
      case "Content":
        dimensionProperty = "mops";
        break;
      default:
        null;
    }
    this.props.onSaveRound(round, hits, misses, clicks, dimensionProperty);
  };

  play = () => {
    const video = document.getElementById("video");
    video.play();
  };

  performAction = () => {
    this.hits = this.hits + 1;
    this.setState({ elements: [] });
    if (this.props.dimension === "Incentives") {
      // Add points and trigger incentive
      this.setState(
        {
          points: this.state.points + this.incentives,
          isIncentiveActive: true
        },
        () => {
          setTimeout(() => {
            this.setState({ isIncentiveActive: false });
          }, 1000);
        }
      );
    }
  };

  createRandomElement = (round, dimension, rollback) => {
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const id = Math.floor(Math.random() * 1000);
    const opacity =
      dimension === "Object clarity" ? getOpacity(round, rollback) : 1;
    const speed = dimension === "Speed" ? getSpeed(round, rollback) : 2.5;
    return (
      <Element
        id={id}
        src={iconValue}
        onClick={() => this.performAction()}
        visible={true}
        opacity={opacity}
        speed={speed}
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
          {this.state.gameStarted ? (
            <DashBoard
              dimension={this.props.dimension}
              points={this.state.points}
            />
          ) : null}
          <Incentive active={this.state.isIncentiveActive}>
            + {this.incentives}
          </Incentive>
          <video id="video" src={beep} style={{ height: 0, width: 0 }} />
        </GameComp>
      );
    }
    return null;
  }
}

export default Game;
