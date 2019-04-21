import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';


class App extends Component {

  id = 0;

  state = {
    infomation: []
  }

  handleCreate = (data) => {
    const { infomation } = this.state
    this.setState({
      infomation: infomation.concat(Object.assign({}, data, {
        id: this.id++
      }))
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList data={this.state.infomation} />
      </div>
    );
  }
}

export default App;
