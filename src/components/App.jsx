import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import School from './School';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Header />
            <div className="App">
              <div className="page-content">
                <Route exact path="/" component={Home} />
                <Route path="/schools/:id" component={School} />
              </div>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
