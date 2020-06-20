import React from 'react'
import classNames from 'classnames/bind'
import styles from './PostList.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const PostItem = () => {
  return (
    <div className={cx('post-item')}>
      <h2><a>타이틀</a></h2>
      <div className={cx('date')}>2020-06-20</div>
      <p>내용</p>
      <div className={cx('tags')}>
        <a>#태그</a>
        <a>#태그</a>
        <a>#태그</a>
      </div>
    </div>
  )
}

const PostList = () => (
  <div className={cx('post-list')}>
    <PostItem />
    <PostItem />
    <PostItem />
    <PostItem />
  </div>
)

export default PostList
