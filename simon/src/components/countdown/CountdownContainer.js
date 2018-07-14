// @flow

import { connect } from "react-redux";

// Wrapped component
import Countdown from "./Countdown.jsx";

// Actions
import { startUserInput } from "../../actions/actions.js";

const mapStateToProps = state => ({
  countdown: state.navigation.countdown
});

const mapDispatchToProps = dispatch => ({
  onStartUserInput: () => {
    dispatch(startUserInput());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
