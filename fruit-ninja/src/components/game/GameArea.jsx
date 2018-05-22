import React, { Component } from "react";

// Styled componets
import GameComp from "./Game.js";
import GameAreaComp from "./GameArea.js";
import StatusBarComp from "./StatusBar.js";
// Components
import StatusBar from "./StatusBar.jsx";
import Game from "./Game.jsx";

class GameArea extends Component {
  render() {
    if (this.props.userId) {
      return (
        <GameAreaComp>
          <GameComp>
            <Game />
          </GameComp>
          <StatusBarComp>
            <StatusBar />
          </StatusBarComp>
        </GameAreaComp>
      );
    } else return null;
  }
}

export default GameArea;