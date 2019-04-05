import React, { Component } from 'react';
import './Movie.css'



class Movie extends Component {
  render() {
    return (
      <div>
        <h1>Hello This is a Movie</h1>  
        <MoviePoster />
      </div>
    );
  }
}

class MoviePoster extends Component {
  render() {
    return (
      <div>
        <img src="https://post-phinf.pstatic.net/MjAxODEyMThfMTM2/MDAxNTQ1MTE1Mzg5NTk3.uM82sQH5oOsdbPElrNIR3R8yPyPKWUOANMC2pEkBZSgg.rHuoP7uYPD0YX23AlqVzA-rJ7dw6cSCciUa2fMhwW0og.PNG/image_2004770701545021747352.png?type=w1200" />
      </div>
    );
  }
}

export default Movie;