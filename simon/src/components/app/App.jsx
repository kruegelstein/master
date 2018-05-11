import React, { Component } from "react";

import { ThemeProvider } from "styled-components";
// Components
import Square from "../square/SquareContainer.js";
import Circle from "../circle/CircleContainer.js";

// Styled Components
import AppComp from "./App.js";

class App extends Component {
  state = {
    shapes: [],
    numberOfShapes: 10
  };
  componentWillMount() {
    let i = 0;
    for (i = 0; i < this.state.numberOfShapes; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        this.state.shapes.push(
          <Square
            active={false}
            key={this.generateID()}
            color={
              this.props.theme.baseColors[
                Object.keys(this.props.theme.baseColors)[
                  Math.floor(Math.random() * 6)
                ]
              ]
            }
            size={
              this.props.theme.sizes[
                Object.keys(this.props.theme.sizes)[
                  Math.floor(Math.random() * 4)
                ]
              ]
            }
            margin={
              this.props.theme.margin[
                Object.keys(this.props.theme.margin)[
                  Math.floor(Math.random() * 3)
                ]
              ]
            }
          />
        );
      } else {
        this.state.shapes.push(
          <Circle
            active={false}
            key={this.generateID()}
            color={
              this.props.theme.baseColors[
                Object.keys(this.props.theme.baseColors)[
                  Math.floor(Math.random() * 6)
                ]
              ]
            }
            size={
              this.props.theme.sizes[
                Object.keys(this.props.theme.sizes)[
                  Math.floor(Math.random() * 4)
                ]
              ]
            }
            margin={
              this.props.theme.margin[
                Object.keys(this.props.theme.margin)[
                  Math.floor(Math.random() * 3)
                ]
              ]
            }
          />
        );
      }
    }
    console.log("###", this.state.shapes);
  }

  generateID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
  render() {
    let index = 0;
    const numberOfShapes = 10;
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>{this.state.shapes.map(shape => shape)}</AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
