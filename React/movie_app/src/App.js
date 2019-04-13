import React, { Component } from 'react';
import './App.css';
import Movie from './components/Movie';

const movies = [
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
  }
]

class App extends Component {
  state = {
    greeting: 'Hello'
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        greeting: 'Hello again!'
      })
    }, 5000)
  }
  render() {
    return (
      <div className="App">
        {this.state.greeting}
        {movies.map((movie, idx) => {
          return <Movie title={movie.title} poster={movie.poster} key={idx} />
        })}
      </div>
    );
  }
}

export default App;
