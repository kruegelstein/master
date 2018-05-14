// @flow

import { connect } from "react-redux";

// Wrapped component
import Circle from "./Circle.jsx";

// Actions
import { dummyAction } from "../../actions/actions.js";

const mapStateToProps = state => ({
  test: state.test,
  training: state.environment.training
});

const mapDispatchToProps = dispatch => ({
  onUseDummyAction: id => {
    dispatch(dummyAction(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Circle);
