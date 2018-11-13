import React, { Component } from "react";
import Pressure from "pressure";

// Styled componets
import GameComp from "./Game.js";
import Button from "../general/Button.js";

import Rows from "./Rows/RowsContainer.js";

// Sounds
import beep from "../../sounds/Beep.mov";

// Helper
import { getTime } from "../../utils/helper.js";

class Game extends Component {
  state = {
    gameStarted: false,
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

  start = () => {
    this.play();
    this.setState({ gameStarted: true });
  };

  play = () => {
    const video = document.getElementById("video");
    video.play();
  };

  resetClicks = () => {
    this.setState({
      clicks: []
    });
  };

  render() {
    if (!this.props.isResults) {
      return (
        <GameComp id="element" userId={this.props.userId}>
          <Rows
            gameStarted={this.state.gameStarted}
            resetClicks={() => this.resetClicks()}
            clicks={this.state.clicks}
            play={() => this.play()}
          />
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
