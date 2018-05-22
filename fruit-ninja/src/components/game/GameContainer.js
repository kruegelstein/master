// @flow

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions
import { loseLive } from "../../actions/actions.js";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoseLive: () => {
    dispatch(loseLive());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
