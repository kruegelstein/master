// @flow

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
