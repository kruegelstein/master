//  

import { connect } from "react-redux";

// Wrapped component
import Row from "./Row.jsx";

// Actions
import {} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  activeRows: state.rows.activeRows
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row);
