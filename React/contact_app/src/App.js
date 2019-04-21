import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';


class App extends Component {

  id = 0;

  state = {
    infomation: []
  }

  handleCreate = (data) => {
    const { infomation } = this.state
    this.setState({
      infomation: infomation.concat({
        ...data,
        id: this.id++
      })
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {JSON.stringify(this.state.infomation)}
      </div>
    );
  }
}

export default App;
