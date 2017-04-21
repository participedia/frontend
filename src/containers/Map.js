import { connect } from "react-redux";
import MapVisualization from "../components/MapVisualization/MapVisualization";

const mapDispatchToProps = dispatch => ({
  // XXX TODO: connect to a search
});

const Map = connect(undefined, mapDispatchToProps)(MapVisualization);

export default Map;
