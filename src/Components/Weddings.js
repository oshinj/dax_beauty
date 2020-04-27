import React, { Component } from 'react';

export class Weddings extends Component {
  componentDidMount() {
    this.props.lightbox();
  }
  render() {
    return (
      <>
        <h2><span>Weddings</span></h2>
        <div className="gallery">
          <img src={process.env.PUBLIC_URL + "/images/wedding/1.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/2.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/8.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/4.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/5.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/6.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/7.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/8.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/9.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/10.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/11.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/12.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/13.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/14.JPG"} className="wedgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/wedding/15.JPG"} className="wedgal" alt=""></img>
        </div>
      </>
    )
  }
}

export default Weddings;