import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import requestUrl from './resources/OnAir_2018_NOV.xml';
import * as parserModule from './helpers/parserModule';
import * as XMLParser from 'react-xml-parser';
import * as searchModule from './helpers/searchModule';

class App extends Component {
  privateData;
  set data(value) {
    this.privateData = value;
  }
  get data() { 
    return this.privateData;
  }

  getXML = () => {
    let oReq = new XMLHttpRequest();
    oReq.onload = this.reqListener;
    oReq.open("get", requestUrl, true);
    oReq.send();
  }  

  findCities = () => {
    let test = searchModule.searchCities(this.data);
    console.log('TEST')
    console.dir(test);
  }
  
  reqListener = (e) => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(e.currentTarget.responseText,"text/xml");
    let xml = new XMLParser().parseFromString(e.currentTarget.responseText);
    this.data = xml;
    console.log('XML1');
    console.dir(xml);
    let a = parserModule.parse(xmlDoc);
    console.log('XML2');
    console.dir(a);
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
          <button onClick={this.findCities}>
            Find Cities
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
