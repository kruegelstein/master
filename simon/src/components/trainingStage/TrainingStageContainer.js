// @flow

import { connect } from "react-redux";

// Wrapped component
import TrainingStage from "./TrainingStage.jsx";

// Actions
import {
  writeElementsToState,
  writePatternToState,
  startCountdown
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  pattern: state.environment.pattern,
  training: state.navigation.training
});

const mapDispatchToProps = dispatch => ({
  onWriteElementsToState: elements => {
    dispatch(writeElementsToState(elements));
  },
  onWritePatternToState: pattern => {
    dispatch(writePatternToState(pattern));
  },
  onStartCountdown: () => {
    dispatch(startCountdown());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingStage);
