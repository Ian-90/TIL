import React from 'react'
import classNames from 'classnames/bind'
import styles from './PreviewPane.module.scss'
import MarkdownRender from 'components/common/MarkdownRender'

const cx = classNames.bind(styles)

const PreviewPane = ({ markdown, title }) => (
  <div className={cx('preview-pane')}>
    <h1 className={cx('title')}>
      {title}
    </h1>
    <div>
      <MarkdownRender markdown={markdown} />
    </div>
  </div>
)

export default PreviewPane
