import React, { Component } from 'react';
import Router from 'components/Router';
import Header from 'components/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router />
      </>
    );
  }
}

export default App;