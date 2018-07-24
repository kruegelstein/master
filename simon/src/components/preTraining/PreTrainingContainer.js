// @flow

import { connect } from "react-redux";

// Wrapped component
import PreTraining from "./PreTraining.jsx";

// Actions
import { startTraining } from "../../actions/actions.js";

const mapStateToProps = state => ({
  preTraining: state.navigation.preTraining
});

const mapDispatchToProps = dispatch => ({
  onStartTraining: () => {
    dispatch(startTraining());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PreTraining);
