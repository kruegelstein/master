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
  nextRound
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.navigation.userInput,
  selectedElements: state.input.selected,
  currentRound: state.navigation.round
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
  onNextRound: () => {
    dispatch(nextRound());
  },
  onShowResults: () => {
    dispatch(showResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInputStage);
