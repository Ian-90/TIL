import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './MarkdownRender.module.scss'
import marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import DOMPurify from 'dompurify'

const cx = classNames.bind(styles)

class MarkdownRender extends Component {
  constructor(props) {
    super(props);
    const { markdown } = props
    this.state = {
      html: markdown ? DOMPurify.sanitize(marked(markdown, { breaks: true })) : '',
    }
  }

  renderMarkdown = () => {
    const { markdown } = this.props

    if(!markdown) {
      this.setState({ html: ''})
      return
    }

    this.setState({
      html: DOMPurify.sanitize(marked(markdown, {
        breaks: true
      }))
    })
  }

  componentDidMount = () => Prism.highlightAll()

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown()
    }

    if(prevState.html !== this.state.html) {
      Prism.highlightAll()
    }
  }

  render() {
    const { html } = this.state

    const markup = {
      __html: html
    }

    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />
    )
  }
}

export default MarkdownRender
