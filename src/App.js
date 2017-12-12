import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Idea Board React - Rails practice</h1>
        </header>
        <IdeaContrainer />
        <p className="App-intro">
         Idea Board Paragraph 
        </p>
      </div>
    );
  }
}

export default App;
