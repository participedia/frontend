require("./LoadingButton.css");

let React = require("react");
let Button = require("react-bootstrap/lib/Button");

let Loading = require("./Loading");

let LoadingButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    icon: React.PropTypes.string,
    // Defaults to label + 'ing' if not provided
    loadingLabel: React.PropTypes.string
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
