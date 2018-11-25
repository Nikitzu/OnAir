import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import CityPreview from './CityPreview';

import * as XMLParser from 'react-xml-parser';
import * as searchModule from './helpers/searchModule';

import requestUrl from './resources/OnAir_2018_NOV_edited.xml';
class App extends Component {

  constructor(props) {
    super(props);

    this.privateData = {};
    this.timeoutIndex = null;

    this.state = {
      searchWord: '',
      citiesData: { },
      searchResults: [],
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

  getXML = () => {
    let oReq = new XMLHttpRequest();
    oReq.onload = this.reqListener;
    oReq.open("get", requestUrl, true);
    oReq.send();
  }

  reqListener = (e) => {
    let xml = new XMLParser().parseFromString(e.currentTarget.responseText);
    this.data = xml;
    this.findCities();
  }
  
  findCities = () => {
    let citiesData = searchModule.searchCities2(this.data);

    this.setState({
      ...this.state,
      citiesData,
    })
    console.dir(this.state.citiesData);
  }

  onInputChange = (e) => {
    if (this.timeoutIndex) {
      window.clearTimeout(this.timeoutIndex);
    }
    this.setState({
      searchWord: e.currentTarget.value,
      activeCity: e.currentTarget.value.toLowerCase(),
    }, () => {
      let arr;
      this.timeoutIndex = setTimeout(() => {
        arr = searchModule.searchByMatcher(this.state.searchWord, this.privateData); 
        console.log(arr)}, 400);
    });
  }

  setActiveCity = (e) => {
    this.setState({
      activeCity: e.currentTarget.attributes.getNamedItem('data-name').value
    })
  }

  renderMainPage = () => {
    return (
      <React.Fragment>
        <div className="sub-menu">
          <span className='active'>Города</span>
          <span>Люди</span>
          <span>Места</span>
          <span>События</span>
        </div>
        <div className='descr'>Мы интересно пишем про города</div>
        <div className="city-section">
          { Object.keys(this.state.citiesData).map((city, index) => {
            return (<CityPreview
                    key = {index}
                    city = {city}
                      data = { this.state.citiesData[city] }
                      url = { this.state.citiesData[city].images[0].url}
                      setActiveCity = {this.setActiveCity}
                    />)
          }) }
        </div>

        <button className ='button more'>Больше городов</button>
      </React.Fragment>

    );
  }

  renderActiveCity = () => {
    const citiesData = this.state.citiesData[this.state.activeCity.toLowerCase()];
    const articles = citiesData.articles;

    return (
      <React.Fragment>
        <div className='breadcrumb'>
          <span onClick={this.resetActiveCity}>Главная/</span>
        </div>
        <div className ='city-header' >{this.state.activeCity[0].toUpperCase() + this.state.activeCity.substring(1)}</div>
        { articles.map((article, index) => {
          return (
            <div key = {index} className='city-articles'>

              { citiesData.images[index] !== citiesData.images[index - 1] &&
                citiesData.images[index].length >2 &&
                  (<img className='city-image' src={citiesData.images[index]}></img>)
              }
              <div className='city-article'>{ article }</div>
              </div>
          )})

        }
      </React.Fragment>
    )
  }

  resetActiveCity = () => {
    this.setState({
      searchWord: '',
      activeCity: '',
    })
  }

  renderSearchResults = () => {
    return (<div class='stub'>'We're in progress with this :)'</div>);
  }

  render() {
    return (
      <Router>
      <div className="App">

        <header className="App-header">

          <div className='magazine'>
            <img src='icons_Magazine.png' alt='icon'></img>
            <a className='header-url' target='_blank' href='https://issuu.com/belavia_onair/docs/onair_108_all_issuu'>
              <span>читать <strong>№ 108</strong> (Ноя 2018)</span>
            </a>
          </div>
          <div className='winrar'>
            <img src='icons_WinRAR.png' alt='icon'></img>
            <a className='archive' target='_blank' href='https://www.belaviaonair.by'>
              <span>Архив журналов</span>
            </a>
          </div>
        
          <div className="searcher">
            <img src='./icons_Search.png' alt='search'></img>
            <input type='text'
                   className="searcherInput"
                   value = {this.state.searchWord}
                   onChange = {this.onInputChange}
                   placeholder='попробуйте поискать "Рим" или "итальянская кухня"'
            />
          </div>
        </header>

        <main>

          {this.state.searchWord ?
            this.renderActiveCity() :
            this.state.activeCity ?
            this.renderActiveCity() :
            this.renderMainPage()}
        </main>

        <footer>

        </footer>

      </div>
      </Router>
    );
  }
}

export default App;
