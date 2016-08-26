import React from 'react'
import styles from './AccordionTab.sass'
import CSSModules from 'react-css-modules'

class AccordionTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div styleName={(this.state.open?"tab-open":"tab")}>
        <p styleName="title" onClick={() => {this.setState({open: !this.state.open})}}>{this.props.title}</p>
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(AccordionTab, styles)