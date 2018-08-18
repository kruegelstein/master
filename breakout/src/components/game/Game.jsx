import React, { Component } from "react";

import { ThemeProvider } from "styled-components";

// Components

// Styled components
import Canvas from './Canvas.js'

class Game extends Component {
  render() {
    if(this.props.userId) {
      return <Canvas />
    } return null
  }
}

export default Game;
