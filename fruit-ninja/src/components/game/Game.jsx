import React, { Component } from "react";

// Styled componets
import GameComp from "./Game.js";
import Button from "../general/Button.js";

import Rows from "./Rows/RowsContainer.js";

// Sounds
import beep from "../../sounds/Beep.mov";

class Game extends Component {
  start = () => {
    this.play();
    this.props.startGame();
  };

  play = () => {
    const video = document.getElementById("video");
    video.play();
  };

  render() {
    if (!this.props.isResults) {
      return (
        <GameComp userId={this.props.userId}>
          <Rows play={() => this.play()} />
          {!this.props.gameStarted ? (
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
