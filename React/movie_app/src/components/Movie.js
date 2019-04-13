import React, { Component } from 'react';
import './Movie.css'



class Movie extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>  
        <MoviePoster poster={this.props.poster} />
      </div>
    );
  }
}

class MoviePoster extends Component {
  render() {
    return (
      <div>
        <img src={this.props.poster} />
      </div>
    );
  }
}

export default Movie;