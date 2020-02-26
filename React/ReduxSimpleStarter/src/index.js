import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import Youtube from "../API_KEY";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("surfboards");
  }

  videoSearch = term => {
    YTSearch({ key: Youtube.API_KEY, term: term }, videos =>
      this.setState({
        videos,
        selectedVideo: videos[0]
      })
    );
  };

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
