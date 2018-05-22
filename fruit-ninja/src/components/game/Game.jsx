import React, { Component } from "react";

// Styled componets
import GameComp from "./Game.js";

class Game extends Component {
  render() {
    if (this.props.userId) {
      return <GameComp>Game</GameComp>;
    } else return null;
  }
}

export default Game;
