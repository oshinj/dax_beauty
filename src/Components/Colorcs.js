import React, { Component } from 'react';
import '../App.css';

export class Colorcs extends Component {
  componentDidMount() {
    this.props.lightbox();
  }
  render() {
    return (
      <>
        <h2><span>Color, Cut, & Style</span></h2>
        <div className="gallery">
          <img src={process.env.PUBLIC_URL + "/images/ccs/1.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/2.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/8.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/4.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/5.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/6.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/7.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/9.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/10.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/11.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/12.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/13.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/14.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/15.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/16.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/17.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/18.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/19.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/20.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/21.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/22.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/23.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/24.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/25.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/26.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/27.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/28.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/29.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/30.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/31.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/32.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/33.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/34.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/35.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/36.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/37.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/38.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/39.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/40.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/41.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/42.JPG"} className="ccsgal" alt=""></img>
          <img src={process.env.PUBLIC_URL + "/images/ccs/43.JPG"} className="ccsgal" alt=""></img>
        </div>
      </>
    )
  }
}

export default Colorcs;