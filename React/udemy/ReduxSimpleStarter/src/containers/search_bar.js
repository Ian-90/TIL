import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchWeather } from "../actions/index";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  onInputChange = e => {
    this.setState({
      term: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();

    this.props.fetchWeather(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Get a five-day forecast in your favorite cities"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProp)(SearchBar);
