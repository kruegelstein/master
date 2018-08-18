// @flow

import { connect } from "react-redux";

// Wrapped component
import PreTraining from "./PreTraining.jsx";

// Actions
import {
  startTraining,
  writePatternToState
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.navigation.round,
  elements: state.environment.elements
});

const mapDispatchToProps = dispatch => ({
  onStartTraining: () => {
    dispatch(startTraining());
  },
  onWritePatternToState: (pattern, currentRound) => {
    dispatch(writePatternToState(pattern, currentRound));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PreTraining);
