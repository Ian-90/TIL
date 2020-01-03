import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import Store from "store";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this._deleteNotification = id => {
      this.setState(currentState => {
        const newState = delete currentState.notifications[id];
        return newState;
      });
    };

    this._seenNotification = id => {
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications,
            [id]: {
              ...currentState.notifications[id],
              seen: true
            }
          }
        };
      });
    };
    this.state = {
      notifications: {
        "1": {
          id: 1,
          text: "Someting",
          seen: true
        },
        "2": {
          id: 2,
          text: "Someting else",
          seen: false
        },
        "3": {
          id: 3,
          text: "Someting else but different",
          seen: false
        }
      },
      deleteNotification: this._deleteNotification,
      seenNotification: this._seenNotification
    };
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
}

export default AppContainer;
