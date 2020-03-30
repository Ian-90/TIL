import React, { Component } from "react";
// section 4
// import BookList from "../containers/book-list";
// import BookDetail from "../containers/book-detail";
// section 5
// import SearchBar from "../containers/search_bar";
// import WeatherList from '../containers/weather_list'
import SelectedPostsList from './selected_posts_list'

export default class App extends Component {
  render() {
    return (
      <div>
        <h4>Selected Posts</h4>
        <SelectedPostsList />
        <hr />
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
