import React, { Component } from "react";

import { ThemeProvider } from "styled-components";
// Components
import TrainingStage from "../trainingStage/TrainingStageContainer.js";
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import UserInputStage from "../userInputStage/UserInputStageContainer.js";

// Styled components
import AppComp from "./App.js";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>
          <UserIdInput />
          <TrainingStage theme={this.props.theme} />
          <UserInputStage />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
