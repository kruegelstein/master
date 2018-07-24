import React, { Component } from "react";

import { ThemeProvider } from "styled-components";
// Components
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import IntroScreen from "../introScreen/IntroScreenContainer.js";
import PreTraining from "../preTraining/PreTrainingContainer.js";
import TrainingStage from "../trainingStage/TrainingStageContainer.js";
import Countdown from "../countdown/CountdownContainer.js";
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
          <PreTraining />
          <TrainingStage theme={this.props.theme} />
          <Countdown />
          <UserInputStage />
          <Results />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
