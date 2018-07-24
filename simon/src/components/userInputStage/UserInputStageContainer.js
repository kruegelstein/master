// @flow

import { connect } from "react-redux";

// Wrapped component
import UserInputStage from "./UserInputStage.jsx";

// Actions
import {
  selectElement,
  showResults,
  stopTime,
  saveInput,
  nextRound,
  writeToResults
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.navigation.userInput,
  selectedElements: state.input.selected,
  round: state.navigation.round,
  currentRound: state.currentRound
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: key => {
    dispatch(selectElement(key));
  },
  onStopTime: currentRound => {
    dispatch(stopTime(currentRound));
  },
  onSaveInput: (userInput, currentRound) => {
    dispatch(saveInput(userInput, currentRound));
  },
  onWriteToResults: (results, round) => {
    dispatch(writeToResults(results, round));
  },
  onNextRound: () => {
    dispatch(nextRound());
  },
  onShowResults: () => {
    dispatch(showResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInputStage);
