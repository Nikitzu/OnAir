import React, { Component } from 'react';
import './App.css';
import ImageGallery from 'react-image-gallery';
import * as XMLParser from 'react-xml-parser';
import * as searchModule from './helpers/searchModule';

import requestUrl from './resources/OnAir_2018_NOV.xml';

class App extends Component {

  constructor(props) {
    super(props);
    this.privateData = {};
    this.timeoutIndex = null;
    this.state = {
      searchWord: '',
      citiesData: {
        images: [],
        articles:[],
      }
    }
  }

  set data(value) {
    this.privateData = value;
  }
  get data() {
    return this.privateData;
  }

  componentDidMount () {
    this.getXML();
  }

  onInputChange = (e) => {
    if (this.timeoutIndex) {
      window.clearTimeout(this.timeoutIndex);
    }
    this.setState({
      searchWord: e.currentTarget.value
    }, () => {
      let arr;
      this.timeoutIndex = setTimeout(() => {arr = searchModule.searchByMatcher(this.state.searchWord, this.privateData); console.log(arr)}, 400);
    });
  }

  getXML = () => {
    let oReq = new XMLHttpRequest();
    oReq.onload = this.reqListener;
    oReq.open("get", requestUrl, true);
    oReq.send();
  }

  findCities = () => {
    let citiesData = searchModule.searchCities(this.data);
    this.setState({
      ...this.state,
      citiesData,
    })
    console.dir(this.state.citiesData);
  }
  
  reqListener = (e) => {
    let xml = new XMLParser().parseFromString(e.currentTarget.responseText);
    this.data = xml;
    this.findCities();
  }

  mapImagesForGalery = () => {
    return this.state.citiesData.images.map((i) => {
      return {
        original: i,
        thumbnail: i
      }
    })
  }

  render() {
    return (
      <div className="App">
        <ImageGallery items={this.mapImagesForGalery()} />
        <header className="App-header">
          <input type='text' value = {this.state.searchWord} onChange = {this.onInputChange} />
          <button onClick={this.findCities}>
            Find Cities
          </button>
        </header>
      </div>
    );
  }
}

export default App;
