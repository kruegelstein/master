// @flow

import { connect } from "react-redux";

// Components
import Results from "./Results.jsx";

const mapStateToProps = state => ({
  showResults: state.navigation.results,
  results: state.results
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
