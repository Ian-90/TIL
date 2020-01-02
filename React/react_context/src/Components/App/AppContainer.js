import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import Store from "store";

class AppContainer extends Component {
  state = {
    message: "hello"
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        message: "bye"
      });
    }, 2000);
  };

  render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
}

export default AppContainer;
