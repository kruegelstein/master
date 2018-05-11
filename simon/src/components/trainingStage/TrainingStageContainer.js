// @flow

import { connect } from "react-redux";

// Wrapped component
import TrainingStage from "./TrainingStage.jsx";

// Actions
import { startTraining } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  onStartTraining: () => {
    dispatch(startTraining());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingStage);
