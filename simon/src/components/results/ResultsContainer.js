// @flow

import { connect } from "react-redux";

// Components
import Results from "./Results.jsx";

const mapStateToProps = state => ({
  showResults: state.navigation.results
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
