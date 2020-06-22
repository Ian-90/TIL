import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './EditorPane.module.scss'
import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

const cx = classNames.bind(styles)

class EditorPane extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.editor = React.createRef()
    this.codeMirror = null
    this.cursor = null
  }

  handleChange = ({ target: { value, name }}) => {
    const { onChangeInput } = this.props
    onChangeInput({ name, value }) 
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props
    this.cursor = doc.getCursor()
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    })
  }

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor.current, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
    })

    this.codeMirror.on('change', this.handleChangeMarkdown)
  }

  componentDidMount = () => {
    this.initializeEditor()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this
      if(!codeMirror) return
      codeMirror.setValue(this.props.markdown)
      if(!cursor) return
      codeMirror.setCursor(cursor)
    }
  }

  render() {
    const { handleChange } = this
    const { title, tags } = this.props
    return (
      <div className={cx('editor-pane')}>
        <input
          className={cx('title')}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={this.editor}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }
}

export default EditorPane
