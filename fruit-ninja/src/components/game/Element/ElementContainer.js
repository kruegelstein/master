// @flow

import { connect } from "react-redux";

// Wrapped component
import Element from "./Element.jsx";

// Actions
import {} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element);
