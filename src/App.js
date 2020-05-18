import React, {Component} from 'react';
import Header from './Components/Header';
import TabList from './Components/TabList';
import Body from './Components/Body';
import { Helmet } from 'react-helmet';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      activeTab: 1,
    }
  }
  changeTab = (id) => {
    this.setState({
      activeTab: id
    })
  }
  lightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);
    var images = document.querySelectorAll("img");
    images.forEach(image => {
      image.addEventListener("click", e=>{
        lightbox.className = "active";
        var focus = document.createElement("img");
        focus.src = image.src;
        focus.className = "lightboximg";
        while(lightbox.firstChild){
          lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(focus);
      });
    });
    lightbox.addEventListener("click", e=>{
      if(e.target !== e.currentTarget)
        return;
      lightbox.classList.remove("active");
    });
  }
  render() {
    const tabs = [
      {
        id: 1,
        title: 'Home'
      },
      {
        id: 2,
        title: 'Color, Cut, & Style'
      },
      {
        id: 3,
        title: 'Weddings'
      },
      {
        id: 4,
        title: "Men's Cuts"
      },
      {
        id: 5,
        title: 'Kids'
      },
      {
        id: 6,
        title: 'Reviews'
      },
      {
        id: 7,
        title: 'Some Fun (Movie Recs)'
      },
      {
        id: 8,
        title: 'Contact Us'
      }
    ]
    return (
      <div className="body">
        <Helmet>
          <title>Dax Beauty</title>
        </Helmet>
        <div className="header">
          <Header/>
          <div className="nav-bar">
            <TabList tabs={tabs}
            changeTab={this.changeTab}
            activeTab={this.state.activeTab}/>
          </div>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}
          lightbox={this.lightbox}/>
        </div>
      </div>
    );
  }
}

export default App;
