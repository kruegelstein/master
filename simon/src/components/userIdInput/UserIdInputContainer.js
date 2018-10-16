// @flow

import { connect } from "react-redux";

// Wrapped component
import UserIdInput from "./UserIdInput.jsx";

// Actions
import {
  submitUserId,
  goToIntro,
  selectDimension
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  onStart: (id, dimension) => {
    dispatch(submitUserId(id));
    dispatch(selectDimension(dimension));
    dispatch(goToIntro());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIdInput);
