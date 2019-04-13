import React, { Component } from 'react';
import './App.css';
import Movie from './components/Movie';

class App extends Component {
  state = {

  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        movies: [
          {
            title: 'Matrix',
            poster: 'http://ojsfile.ohmynews.com/down/images/1/ctzxp_249945_1[363282].jpg',
          },
          {
            title: 'Full Metal Jacket',
            poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF48z3ClBQhzf4wr301zI8b_prryzc2xHatueKEC5ZDXxTFsJ'
          },
          {
            title: 'Oldboy',
            poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJCbvPYORxcd8jgGWMsosNeXIRVmI7ptMrsj3Dv81Rea1D2JU'
          },
          {
            title: 'Star Wars',
            poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDhhUig0ltFxr99G4LY90vweM34VJOoNoyvBaP-0Nm6MZSdhoabA'
          },
          {
            title: 'Transptting',
            poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlyMKmtyf03kKhrRDYmFj-qQTJfiRbEoPgsxwi1T9n2fKGDHT'
          }
        ]
      })
    }, 5000)
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
