import React, { Component } from 'react';
import pumba from './images/pumba.png';
import './App.css';
import House from './House.jsx';
import bornean from './images/bornean.jpg';
import redRiver from './images/redRiver.jpg';
import visayan from './images/visayan.jpg';
import wild from './images/wild.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={pumba} className="App-logo" alt="logo" />
          <h1>
            Welcome to Warthogs School of Witchcraft and Wizardry!
          </h1>

          <House 
            name="Bornean Bearded Pigs"
            image={bornean}
            studentNames={[
              "Hairy Grainger",
              "Jason Bournean"
            ]}
            />

          <House 
            name="Visayan Warty Pigs"
            image={visayan}
            studentNames={[
              "Ron Wartsley",
              "Hugh Fearnley Wartingstall"
            ]}
          />

          <House 
            name="Red River Hogs" 
            image={redRiver} 
            studentNames={[
              "Harry Trotter",
              "Neville Hogbottom",
            ]}
          />

          <House 
            name="Wild Boars" 
            image={wild} 
            studentNames={[
              "Michelle O-Boar-ma",
              "Kevin Bacon"
            ]}
          />
        </header>
      </div>
    );
  }
}

export default App;
