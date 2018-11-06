// @flow

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions
import {
  saveRound,
  goToResults,
  nextRound,
  setRollback
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  dimension: state.adaptation.dimension,
  round: state.adaptation.round,
  isResults: state.navigation.results,
  rollback: state.user.rollback
});

const mapDispatchToProps = dispatch => ({
  onSaveRound: (round, hits, misses, clicks, dimensionProperty) => {
    dispatch(saveRound(round, hits, misses, clicks, dimensionProperty));
  },
  goToResults: () => {
    dispatch(goToResults());
  },
  onNextRound: () => {
    dispatch(nextRound());
  },
  onSetRollback: () => {
    dispatch(setRollback());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
