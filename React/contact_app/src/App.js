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

  handleRemove = (id) => {
    const { infomation } = this.state;
    this.setState({
      infomation: infomation.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const { infomation } = this.state;
    this.setState({
      infomation: infomation.map(
        info => {
          if (info.id === id) {
            return {
              id,
              ...data
            }
          };
          return info;
        }
      )
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList 
          data={this.state.infomation} 
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
