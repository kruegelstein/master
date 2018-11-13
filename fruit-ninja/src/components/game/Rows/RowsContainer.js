// @flow

import { connect } from "react-redux";

// Wrapped component
import Rows from "./Rows.jsx";

// Actions
import {
  saveRound,
  goToResults,
  nextRound,
  setRollback,
  changeActiveRows,
  changeNumberOfActiveRows
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension,
  numberOfActivesRows: state.rows.numberOfActivesRows,
  rows: state.rows.rows,
  gameStarted: state.game.started
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
  },
  changeActiveRows: activeRows => {
    dispatch(changeActiveRows(activeRows));
  },
  changeNumberOfActiveRows: rollback => {
    dispatch(changeNumberOfActiveRows(rollback));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rows);
