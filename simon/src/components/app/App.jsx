import React, { Component } from "react";

import { ThemeProvider } from "styled-components";
// Components
import Square from "../square/SquareContainer.js";
import Circle from "../circle/CircleContainer.js";

// Styled Components
import AppComp from "./App.js";

class App extends Component {
  generateID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>
          <Square />
          <Circle
            active={false}
            id={this.generateID()}
            color={this.props.theme.baseColors.red}
            size={this.props.theme.sizes.s}
            margin={this.props.theme.margin.large}
          />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
