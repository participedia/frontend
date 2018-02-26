import React from "react";
import { FormattedMessage } from "react-intl";


export default class TextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let truth = thing[property];
    let truthString = String(truth);
    if (!thing[property] || thing[property].length === 0) {
      return <div />;
    } else if (thing[property] && thing[property].length === 1){
      return (
        <div>
          <p className="sub-sub-heading">
            <FormattedMessage id={property  ? property  : "not_specified"} />
          </p>
          <div className={property + " blond"}><FormattedMessage id={truthString}/></div>
        </div>
      );
    } else if (thing[property] || thing[property].length > 1){
      let items = thing[property].map(item => (
        <div key={item}>
          {item}
        </div>
      ));
      return (
        <div>
          <p className="sub-sub-heading">
            <FormattedMessage id={property ? property : "not_specified"} />
          </p>
          <div className={property}>{items}</div>
        </div>
      );
    }
  }
}
