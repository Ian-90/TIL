import React from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/index'
import { Link } from 'react-router-dom'

class PostsShow extends React.Component {
  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  onDeletePost = () => {
    this.props.deletePost(this.props.match.params.id)
      .then(() => {
        this.props.history.push('/')
      })
  }

  render() {
    const { post } = this.props

    if (!post) {
      return <div>Loading..</div>
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeletePost}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)