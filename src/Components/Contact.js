import React, { Component } from 'react';

export class Contact extends Component {
  render() {
    return (
      <div>
        <h2><span>Contact Us</span></h2>
        <div className="contact-body">
          <div className="google-listing">
            <iframe title='location' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12696.66511399539!2d-122.032824!3d37.2911928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4918bacceea2a815!2sDax%20Beauty%20salon%20and%20spa!5e0!3m2!1sen!2sus!4v1586802644103!5m2!1sen!2sus" width="400" height="300" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
          </div>
          <div className="column">
            <div className="contact-info">
              <h3>Phone: (408) 892-6798</h3>
              <h3>Email: daxbeauty@gmail.com</h3>
            </div>
            <ul className="links">
              <li><a href="https://www.yelp.com/biz/dax-beauty-saratoga/">Yelp</a></li>
              <li><a href="https://www.instagram.com/daxbeautysaratoga/">Instagram</a></li>
              <li><a href="https://facebook.com/Daxbeauty/">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;