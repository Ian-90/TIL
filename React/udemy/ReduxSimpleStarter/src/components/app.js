import React, { Component } from "react";
// section 4
// import BookList from "../containers/book-list";
// import BookDetail from "../containers/book-detail";
// section 5
// import SearchBar from "../containers/search_bar";
// import WeatherList from '../containers/weather_list'

export default class App extends Component {
  render() {
    return (
      <div>
        hello
        {this.props.children}
        {/* <BookList />
        <BookDetail /> */}
        {/* <SearchBar />
        <WeatherList /> */}
      </div>
    );
  }
}
