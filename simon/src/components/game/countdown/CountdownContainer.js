// @flow

import { connect } from "react-redux";

// Wrapped component
import Countdown from "./Countdown.jsx";

// Actions
import { startUserInput, startTime } from "../../../actions/actions.js";

const mapStateToProps = state => ({
  countdown: state.navigation.countdown,
  currentRound: state.navigation.round
});

const mapDispatchToProps = dispatch => ({
  onStartUserInput: currentRound => {
    dispatch(startTime(currentRound));
    dispatch(startUserInput());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
