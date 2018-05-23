// @flow

import { connect } from "react-redux";

// Wrapped component
import GameArea from "./GameArea.jsx";

// Actions

const mapStateToProps = state => ({
  userId: state.user.id,
  level: state.game.level,
  points: state.game.points,
  lives: state.game.live
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
