// @flow

import { connect } from "react-redux";

// Wrapped component
import IntroScreen from "./IntroScreen.jsx";

// Actions
import { showPreTraining, nextRound } from "../../actions/actions.js";

const mapStateToProps = state => ({
  intro: state.navigation.intro
});

const mapDispatchToProps = dispatch => ({
  onPreTraining: () => {
    dispatch(showPreTraining());
    dispatch(nextRound());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
