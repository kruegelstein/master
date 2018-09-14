// @flow

import { connect } from "react-redux";

// Components
import Results from "./Results.jsx";

// Actions
import { submitResultsToDB } from "../../actions/actions.js";

const mapStateToProps = state => ({
  showResults: state.navigation.results,
  results: state.results,
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  sendResultsToDb: (results, id) => {
    dispatch(submitResultsToDB(results, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
