import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  onInputChange = event =>
    this.setState({
      term: event.target.value
    });

  render() {
    return (
      <div>
        <input value={this.state.term} onChange={this.onInputChange} />
      </div>
    );
  }
}

export default SearchBar;
