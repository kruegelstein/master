import React, { Component } from "react";

import { ThemeProvider } from "styled-components";

// Components
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import GameArea from "../game/gameArea/GameAreaContainer.js";

// Styled components
import AppComp from "./App.js";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>
          <UserIdInput />
          <GameArea />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
