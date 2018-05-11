import React, { Component } from "react";

// Components
import Square from "../square/Square.jsx";
import Circle from "../circle/CircleContainer.js";

// Styled Components
import AppComp from "./App.js";

class App extends Component {
  render() {
    return (
      <AppComp>
        <Square />
        <Circle />
      </AppComp>
    );
  }
}

export default App;
