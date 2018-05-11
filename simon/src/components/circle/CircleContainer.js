// @flow

import { connect } from "react-redux";

// Wrapped component
import Circle from "./Circle.jsx";

// Actions
import { dummyAction } from "../../actions/actions.js";

const mapStateToProps = state => ({
  test: state.test
});

const mapDispatchToProps = dispatch => ({
  onUseDummyAction: () => {
    dispatch(dummyAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Circle);
