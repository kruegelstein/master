import React, { Component } from "react";

// Styled componets
import GameComp from "../Game.js";
import GameAreaComp from "./GameArea.js";
import StatusBarComp from "../statusBar//StatusBar.js";
// Components
import StatusBar from "../statusBar/StatusBar.jsx";
import Game from "../GameContainer.js";
import GameOver from "../gameOver/GameOver.jsx";

class GameArea extends Component {
  render() {
    if (this.props.userId) {
      return (
        <GameAreaComp>
          <GameComp>
            {this.props.lives !== 0 ? <Game /> : <GameOver />}
          </GameComp>
          <StatusBarComp>
            <StatusBar
              level={this.props.level}
              points={this.props.points}
              lives={this.props.lives}
            />
          </StatusBarComp>
        </GameAreaComp>
      );
    } else return null;
  }
}

export default GameArea;
