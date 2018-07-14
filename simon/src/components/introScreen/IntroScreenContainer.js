// @flow

import { connect } from "react-redux";

// Wrapped component
import IntroScreen from "./IntroScreen.jsx";

// Actions
import { startTraining } from "../../actions/actions.js";

const mapStateToProps = state => ({
  intro: state.navigation.intro
});

const mapDispatchToProps = dispatch => ({
  onStartTraining: () => {
    dispatch(startTraining());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
