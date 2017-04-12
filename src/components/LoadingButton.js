require("./LoadingButton.css");

let React = require("react");
import { string, bool } from "prop-types";
let Button = require("react-bootstrap/lib/Button");

let Loading = require("./Loading");

let LoadingButton = React.createClass({
  propTypes: {
    label: string.isRequired,
    loading: bool.isRequired,
    icon: string,
    // Defaults to label + 'ing' if not provided
    loadingLabel: string
  },
  render() {
    let { icon, label, loading, loadingLabel, ...props } = this.props;
    if (!loadingLabel) {
      loadingLabel = `${label}ing`;
    }
    return (
      <Button disabled={loading} {...props}>
        {loading
          ? <span>
              <Loading inline delay={false} />
              {" "}
              {icon && <img src={icon} className="LoadingButton__icon" />}
              {" "}
              {loadingLabel}
              …
            </span>
          : <span>
              {icon && <img src={icon} className="LoadingButton__icon" />}
              {" "}
              {label}
            </span>}
      </Button>
    );
  }
});

module.exports = LoadingButton;
