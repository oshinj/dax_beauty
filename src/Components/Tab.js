import React, { Component } from 'react';

export class Tab extends Component {
  addStyling = () => {
    if(this.props.tab.id === this.props.activeTab) {
      return {backgroundColor: '#464646'}
    }
  }
  render() {
    return (
      <div>
        <a onClick={this.props.changeTab.bind(this, this.props.tab.id)} style={this.addStyling()}>{this.props.tab.title}</a>
      </div>
    );
  }
}

export default Tab;