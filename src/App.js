import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (

      <div className="App">
        <header>
        <div className="jumbotron">
          <img src="/assets/images/bloc_jams_logo.png" alt="bloc jams logo"></img>
            <h2 className="lead">Turn The Music up!</h2>
              </div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <ul>
               <li className="navbar-brand"><Link to='/'>About</ Link></li>
               <li className="navbar-brand"><Link to='/library'>Music Library</ Link></li>
               </ul>
             </nav>
        </header>

        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
