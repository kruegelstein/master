// @flow

import { connect } from "react-redux";

// Wrapped component
import Rows from "./Rows.jsx";

// Actions
import {
  saveRound,
  goToResults,
  nextRound,
  setRollback
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension
});

const mapDispatchToProps = dispatch => ({
  onSaveRound: (round, hits, misses, clicks, dimensionProperty) => {
    dispatch(saveRound(round, hits, misses, clicks, dimensionProperty));
  },
  onNextRound: () => {
    dispatch(nextRound());
  },
  onSetRollback: () => {
    dispatch(setRollback());
  },
  goToResults: () => {
    dispatch(goToResults());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rows);
