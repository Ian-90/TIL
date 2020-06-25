import React, { Component } from 'react'
import EditorHeader from 'components/editor/EditorHeader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as editorActions from 'store/modules/editor'
import queryString from 'query-string'

class EditorHeaderContainer extends Component {
  handleGoBack = () => {
    const { history } = this.props
    history.goBack()
  }

  handleSubmit = async () => {
    const {
      title,
      markdown,
      tags,
      EditorActions,
      history,
      location
    } = this.props
    const post = {
      title,
      body: markdown,
      tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    }

    try {
      const { id } = queryString.parse(location.search)
      if (id) {
        await EditorActions.editPost({ id, ...post })
        history.push(`/post/${id}`)
        return
      }
      await EditorActions.writePost(post)
      history.push(`/post/${this.props.postId}`)
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount = () => {
    const { EditorActions, location } = this.props
    EditorActions.initialize()

    const { id } = queryString.parse(location.search)
    if (id) {
      EditorActions.getPost(id)
    }
  }

  render() {
    const { handleGoBack, handleSubmit } = this
    const { id } = queryString.parse(this.props.location.search)
    return (
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
        isEdit={id ? true : false}
      />
    )
  }
}

export default connect(
  (state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    tags: state.editor.get('tags'),
    postId: state.editor.get('postId'),
  }),
  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer))
