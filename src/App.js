import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import requestUrl from './resources/OnAir_2018_NOV.xml'

class App extends Component {
  getXML = () => {
    var oReq = new XMLHttpRequest();
    oReq.onload = this.reqListener;
    oReq.open("get", `${requestUrl}`, true);
    oReq.send();
  }
  
  reqListener(e) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(this.responseText,"text/xml");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.getXML}>
            Load Data
          </button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
