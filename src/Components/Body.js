import React, { Component } from 'react';
import ScrollUpButton from 'react-scroll-up-button';
import Home from './Home'
import Colorcs from './Colorcs'
import Weddings from './Weddings'
import Mens from './Mens'
import Kids from './Kids'
import Contact from './Contact'

export class Body extends Component {
  displayContent = () => {
    var activeTab = this.props.activeTab
    if (activeTab === 1)
      return <Home/>
    else if (activeTab === 2)
      return <Colorcs lightbox={this.props.lightbox}/>
    else if (activeTab === 3)
      return <Weddings lightbox={this.props.lightbox}/>
    else if (activeTab === 4)
      return <Mens lightbox={this.props.lightbox}/>
    else if (activeTab === 5)
      return <Kids lightbox={this.props.lightbox}/>
    else
      return <Contact/>
  }
  render() {
    return (
      <>
        <ScrollUpButton />
        {this.displayContent()}
      </>
    );
  }
}

export default Body;