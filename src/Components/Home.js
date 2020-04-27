import React, { Component } from 'react';
import portrait from '../images/portrait.jpg';
import tour from '../videos/tour.mp4';

export class Home extends Component {
  render() {
    return (
      <div id="main-body">
        <div className="portrait">
          <img id="portrait" src={portrait} alt=""></img>
        </div>
        <div className="text-header">
          <div>
            <h2><span>About</span></h2>
          </div>
          <div id="main-text">
            <p>
              Hello, my name is Daksha Joshi, and I am the owner and head stylist of
              Dax Beauty Salon & Spa. I started working in the beauty industry 20 years
              ago and have a wide variety of experience from traditional indian henna
              and bridal services to the most modern techniques in hair and skincare.
              I regularly attend advanced beauty education classes and trade shows to
              stay up to date on my craft and informed on the latest products and
              services in the industry.
            </p>
            <p>
              I chose to work in this industry because watching my clients walk away
              smiling and feeling beautiful brings me happiness.
            </p>
          </div>
        </div>
        <div className="salon-tour">
          <h2><span>A festive salon tour</span></h2>
          <video width="480" height="400" controls>
            <source src={tour} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    )
  }
}

export default Home;