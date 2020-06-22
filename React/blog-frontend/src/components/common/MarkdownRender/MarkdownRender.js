import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './MarkdownRender.module.scss'
import marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

const cx = classNames.bind(styles)

class MarkdownRender extends Component {
  constructor(props) {
    super(props);
    const { markdown } = props
    this.state = {
      html: markdown ? marked(markdown, { breaks: true, sanitize: true }) : '',
    }
  }

  renderMarkdown = () => {
    const { markdown } = this.props

    if(!markdown) {
      this.setState({ html: ''})
      return
    }

    this.setState({
      html: marked(markdown, {
        breaks: true,
        sanitize: true
      })
    })
  }

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
