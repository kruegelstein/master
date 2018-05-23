// @flow

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions
import { loseLive, gainLive, addPoint } from "../../actions/actions.js";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoseLive: () => {
    dispatch(loseLive());
  },
  onGainLive: () => {
    dispatch(gainLive());
  },
  onAddPoint: () => {
    dispatch(addPoint());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
