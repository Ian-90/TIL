import React, { Component } from 'react';
import './App.css';
import Movie from './components/Movie';

class App extends Component {
  state = {

  }

  componentDidMount = () => {
    fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
  }

  renderMovies = () => {
    const movies = this.state.movies.map((movie, idx) => {
      return <Movie title={movie.title} poster={movie.poster} key={idx} />
    })

    return movies
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this.renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
