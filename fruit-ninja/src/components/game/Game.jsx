import React, { Component } from "react";
import Pressure from "pressure";

// Styled componets
import GameComp from "./Game.js";
import Button from "../general/Button.js";

import Elements from "./Elements/ElementsContainer.js";

// Helper
import { getTime } from "../../utils/helper.js";

class Game extends Component {
  state = {
    click: {
      start: 0,
      end: 0,
      xCoordinate: 0,
      yCoordinate: 0,
      force: 0,
      duration: 0
    }
  };
  componentDidMount() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      Pressure.set("#element", {
        start: event => {
          const clickStart = Date.now();
          let xCoordinate;
          let yCoordinate;
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            xCoordinate = touch.clientX;
            yCoordinate = touch.clientY;
          }
          this.setState({
            click: {
              ...this.state.click,
              start: clickStart,
              xCoordinate,
              yCoordinate
            }
          });
        },
        change: (force, event) => {
          this.setState({ click: { ...this.state.click, force } });
        },
        end: () => {
          const clickEnd = Date.now();
          const clickStart = this.state.click.start;
          const clickDuration = getTime(clickStart, clickEnd);
          this.setState(
            {
              click: {
                ...this.state.click,
                end: clickEnd,
                duration: clickDuration
              }
            },
            () => {
              this.props.saveClick(this.state.click);
              this.setState({
                click: {
                  start: 0,
                  end: 0,
                  xCoordinate: 0,
                  yCoordinate: 0,
                  force: 0,
                  duration: 0
                }
              });
            }
          );
        }
      });
    }
  }

  start = () => {
    this.props.startGame();
  };

  render() {
    if (!this.props.isResults) {
      return (
        <GameComp id="element" userId={this.props.userId}>
          <Elements />
          {!this.props.gameStarted ? (
            <Button middle onClick={() => this.start()}>
              Start!
            </Button>
          ) : null}
        </GameComp>
      );
    }
    return null;
  }
}

export default Game;
