import React, { Component } from 'react';

export class Kids extends Component {
  componentDidMount() {
    this.props.lightbox();
  }
  render() {
    return (
      <>
        <h2><span>Color, Cut, & Style</span></h2>
        <div className="gallery">
          <img src={process.env.PUBLIC_URL + "/images/kids/1.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/2.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/8.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/4.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/5.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/6.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/7.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/8.JPG"} className="kidgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/kids/9.JPG"} className="kidgal" alt=""></img>
        </div>
      </>
    )
  }
}

export default Kids;