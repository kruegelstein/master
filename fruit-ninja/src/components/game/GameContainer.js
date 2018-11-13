// @flow

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions
import {} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  isResults: state.navigation.results
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
