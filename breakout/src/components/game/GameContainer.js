// @flow

import { connect } from "react-redux";

// Components
import Game from "./Game.jsx";

// Actions
import { setNewSpeed } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  adaptationDimension: state.adaptation.dimension,
  speed: state.adaptation.speed
});

const mapDispatchToProps = dispatch => ({
  onSetNewSpeed: () => {
    dispatch(setNewSpeed());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
