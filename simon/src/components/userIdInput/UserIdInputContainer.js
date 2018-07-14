// @flow

import { connect } from "react-redux";

// Wrapped component
import UserIdInput from "./UserIdInput.jsx";

// Actions
import { submitUserId, goToIntro } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  onSubmitUserId: id => {
    dispatch(submitUserId(id));
    dispatch(goToIntro());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIdInput);
