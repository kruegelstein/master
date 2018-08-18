// @flow

import { connect } from "react-redux";

// Components
import Game from "./Game.jsx";

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
