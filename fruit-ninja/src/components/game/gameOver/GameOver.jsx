import React, { Component } from "react";

// Styled componets
import BlockContainer from "../../general/BlockContainer.js";
import GameOverComp from "./GameOver.js";

class GameOver extends Component {
  render() {
    return (
      <BlockContainer>
        <GameOverComp>GAME OVER</GameOverComp>
      </BlockContainer>
    );
  }
}

export default GameOver;
