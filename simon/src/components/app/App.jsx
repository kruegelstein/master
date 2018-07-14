import React, { Component } from "react";

import { ThemeProvider } from "styled-components";
// Components
import TrainingStage from "../trainingStage/TrainingStageContainer.js";
import IntroScreen from "../introScreen/IntroScreenContainer.js";
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import UserInputStage from "../userInputStage/UserInputStageContainer.js";
import Results from "../results/ResultsContainer.js";

// Styled components
import AppComp from "./App.js";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>
          <UserIdInput />
          <IntroScreen />
          <TrainingStage theme={this.props.theme} />
          <UserInputStage />
          <Results />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
