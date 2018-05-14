// @flow

import { connect } from "react-redux";

// Wrapped component
import TrainingStage from "./TrainingStage.jsx";

// Actions
import {
  startTraining,
  writeElementsToState,
  writePatternToState
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  elements: state.environment.elements,
  pattern: state.environment.pattern,
  training: state.environment.training
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingStage);
