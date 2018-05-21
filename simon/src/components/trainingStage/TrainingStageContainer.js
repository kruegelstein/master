// @flow

import { connect } from "react-redux";

// Wrapped component
import TrainingStage from "./TrainingStage.jsx";

// Actions
import {
  startTraining,
  writeElementsToState,
  writePatternToState,
  startUserInput
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  elements: state.environment.elements,
  pattern: state.environment.pattern,
  training: state.environment.training,
  userInput: state.environment.userInput
});

const mapDispatchToProps = dispatch => ({
  onStartTraining: () => {
    dispatch(startTraining());
  },
  onWriteElementsToState: elements => {
    dispatch(writeElementsToState(elements));
  },
  onWritePatternToState: pattern => {
    dispatch(writePatternToState(pattern));
  },
  onStartUserInput: () => {
    dispatch(startUserInput());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingStage);
