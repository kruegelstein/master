// @flow

import { connect } from "react-redux";

// Wrapped component
import UserIdInput from "./UserIdInput.jsx";

// Actions
import { submitUserId } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  onSubmitUserId: id => {
    dispatch(submitUserId(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIdInput);
