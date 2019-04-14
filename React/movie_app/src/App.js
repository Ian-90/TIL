import React, { Component } from 'react';
import './App.css';
import Movie from './components/Movie';

class App extends Component {
  state = {

  }

  componentDidMount = () => {
    this.getMovies();
  }

  renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
                title={movie.title_english} 
                poster={movie.medium_cover_image} 
                key={movie.id} 
                genres={movie.genres}
                synopsis={movie.synopsis} 
              />
    })

    return movies
  }
  
  getMovies = async () => {
    const movies = await this.callApi()
    this.setState({
      movies
    }) 
  }

  callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(res => res.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
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
