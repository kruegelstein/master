import { connect } from "react-redux";

// Wrapped component
import Element from "./Element.jsx";

// Actions
import {
  hitElement,
  missElement,
  toggleIncentives
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension,
  isIncentiveActive: state.adaptation.isIncentiveActive
});

const mapDispatchToProps = dispatch => ({
  hitElement: () => {
    dispatch(hitElement());
  },
  missElement: () => {
    dispatch(missElement());
  },
  toggleIncentives: currentState => {
    dispatch(toggleIncentives(currentState));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element);
