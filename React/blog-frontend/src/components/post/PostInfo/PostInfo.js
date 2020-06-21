import React from 'react'
import classNames from 'classnames/bind'
import styles from './PostInfo.module.scss'

const cx = classNames.bind(styles)

const PostInfo = () => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>타이틀</h1>
      <div className={cx('tags')}>
        <a>#태그</a>
        <a>#태그</a>
        <a>#태그</a>
      </div>
      <div className={cx('date')}>Jun 21, 2020</div>
    </div>
  </div>
)

export default PostInfo
