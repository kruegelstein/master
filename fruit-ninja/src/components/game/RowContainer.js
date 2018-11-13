// @flow

import { connect } from "react-redux";

// Wrapped component
import Row from "./Row.jsx";

// Actions
import { changeActiveRows } from "../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension,
  activeRows: state.rows.activeRows
});

const mapDispatchToProps = dispatch => ({
  changeActiveRows: activeRows => {
    dispatch(changeActiveRows(activeRows));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row);
