import React, { Component } from 'react';
import './CityPreview.css';

class CityPreview extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    shortArticle = () => {
        let isFullSentence = this.props.data.articles[0][0].toLowerCase() !== this.props.data.articles[0][0]
        return isFullSentence ? 
        this.props.data.articles[0].substring(0, 200) + '...' :
        '...' + this.props.data.articles[0].substring(0, 200) + '...';
    }

    render() {
        
        return(
            <div className= "city-item">
                <img src={this.props.data.images[0]} alt="city"></img>
                <div className='city-name'>{this.props.city}</div>
                {this.shortArticle()}
            </div>
        )
    }
}

export default CityPreview;