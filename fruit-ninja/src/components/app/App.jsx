import React, { Component } from "react";

import { ThemeProvider } from "styled-components";

// Styled components
import AppComp from "./App.js";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>Hello wolrd</AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
