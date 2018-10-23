// @flow

import { connect } from "react-redux";

// Wrapped component
import UserInputStage from "./UserInputStage.jsx";

// Actions
import {
  showResults,
  nextRound,
  writeToResults,
  setNewSpeed,
  setNewOpacity,
  setRollback
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.navigation.userInput,
  selectedElements: state.input.selected,
  round: state.navigation.round,
  currentRound: state.currentRound,
  showResults: state.navigation.results,
  results: state.results,
  speed: state.user.speed,
  opacity: state.user.opacity,
  dimension: state.user.dimension,
  rollback: state.user.rollback
});

const mapDispatchToProps = dispatch => ({
  onWriteToResults: (results, round, speed) => {
    dispatch(writeToResults(results, round, speed));
  },
  onNextRound: score => {
    dispatch(nextRound(score));
  },
  onShowResults: () => {
    dispatch(showResults());
  },
  onSetNewSpeed: (currentSpeed, rollback) => {
    dispatch(setNewSpeed(currentSpeed, rollback));
  },
  onSetRollback: () => {
    dispatch(setRollback());
  },
  onSetNewOpacity: (currentOpacity, rollback) => {
    dispatch(setNewOpacity(currentOpacity, rollback));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInputStage);
