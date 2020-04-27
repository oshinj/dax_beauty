import React, { Component } from 'react';

export class Mens extends Component {
  componentDidMount() {
    this.props.lightbox();
  }
  render() {
    return (
      <>
        <h2><span>Mens</span></h2>
        <div className="gallery">
          <img src={process.env.PUBLIC_URL + "/images/men/1.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/2.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/8.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/4.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/5.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/6.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/7.JPG"} className="mengal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/men/8.JPG"} className="mengal" alt=""></img>
        </div>
      </>
    )
  }
}

export default Mens;