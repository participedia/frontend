/* this is the container used when editing a case.  It's job is to get
the data about a case (from a redux store, or from the network), and sets the props
to the corresponding component (the CaseEditor)
*/

import React, { Component, PropTypes } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import CaseEditor from "../components/CaseEditor/CaseEditor";
import { loadObject, CASE_TYPE } from "../actions";

const mapStateToProps = (state, ownProps) => {
    if (state.objects.currentObject) {
        return { case: state.objects.currentObject };
        // return {caseID: ownProps.params.nodeID, case: state.objects.currentObject, loading: false}
    } else {
        return { caseID: ownProps.params.nodeID, case: null, loading: true };
    }
};

function loadData(props) {
    props.dispatch(props.loadObject(CASE_TYPE, props.params.nodeID));
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: function(data) {},
        loadObject: loadObject
    };
};

export const fields = ["title", "body"];

class _EditCase extends Component {
    static propTypes = {
        loadObject: PropTypes.func.isRequired
    };

    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.caseID !== this.props.caseID) {
            // loadData(nextProps)
        }
    }

    render() {
        return <CaseEditor {...this.props} />;
    }
}

export default reduxForm({
    form: "caseform"
})(connect(mapStateToProps, mapDispatchToProps)(_EditCase));
