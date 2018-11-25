import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import './CityPreview.css';

class CityPreview extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    shortArticle = () => {
        if (this.props.data.articles[0]) {
            let isFullSentence = this.props.data.articles[0][0].toLowerCase() !== this.props.data.articles[0][0]
            return isFullSentence ?
                this.props.data.articles[0].substring(0, 200) + '...' :
                '...' + this.props.data.articles[0].substring(0, 200) + '...';
        }
    }

    render() {
        return(
           <div className= "city-item"
                 data-name={this.props.city}
                 onClick={this.props.setActiveCity}
            >
                <img src={this.props.data.images[0] ? this.props.data.images[0] : './images/OnAir_2018_NOV_img_270.jpg'} alt="city"></img>
                <div className='city-name'>{this.props.city[0].toUpperCase() + this.props.city.substring(1)}</div>
                {this.shortArticle()}
            </div>
        )
    }
}

export default CityPreview;