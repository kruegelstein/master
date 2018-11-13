// @flow

import { connect } from "react-redux";

// Wrapped component
import Element from "./Element.jsx";

// Actions
import { hitElement, missElement } from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension
});

const mapDispatchToProps = dispatch => ({
  hitElement: () => {
    dispatch(hitElement());
  },
  missElement: () => {
    dispatch(missElement());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element);
