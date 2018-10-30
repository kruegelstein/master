// @flow

import { connect } from "react-redux";

// Components
import Game from "./Game.jsx";

// Actions
import { setNewSpeed, saveRound, goToResults } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  adaptationDimension: state.adaptation.dimension,
  speed: state.adaptation.speed,
  round: state.adaptation.round,
  isResults: state.navigation.results
});

const mapDispatchToProps = dispatch => ({
  onSetNewSpeed: () => {
    dispatch(setNewSpeed());
  },
  onSaveRound: (round, destroyedBricks, losses, clicks, dimensionProperty) => {
    dispatch(
      saveRound(round, destroyedBricks, losses, clicks, dimensionProperty)
    );
  },
  goToResults: () => {
    dispatch(goToResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
