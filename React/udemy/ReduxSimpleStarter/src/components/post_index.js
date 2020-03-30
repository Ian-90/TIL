import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/index'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class PostIndex extends React.Component {
  // section 6
  // componentWillMount() {
  //   this.props.fetchPosts()
  // }

  renderPosts = () => {
    // section 6
    // return this.props.posts.map((post) => {
    //   return (
    //     <li className="list-group-item" key={post.id}>
    //       <Link to={`posts/${post.id}`}>
    //         <span className="pull-xs-right">{post.categories}</span>
    //         <strong>{post.title}</strong>
    //       </Link>
    //     </li>
    //   )
    // })
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.all
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex)