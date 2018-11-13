// @flow

import { connect } from "react-redux";

// Wrapped component
import Row from "./Row.jsx";

// Actions
import { changeActiveRows } from "../../../actions/actions.js";

const mapStateToProps = state => ({
  activeRows: state.rows.activeRows
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row);
