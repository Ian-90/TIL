import React from 'react'
import classNames from 'classnames/bind'
import styles from './PostInfo.module.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'

const cx = classNames.bind(styles)

const PostInfo = ({ title, pulishedDate, tags }) => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>{title}</h1>
      <div className={cx('tags')}>
        {
          tags && tags.map((tag) => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>)
        }
      </div>
      <div className={cx('date')}>{moment(pulishedDate).format('ll')}</div>
    </div>
  </div>
)

export default PostInfo
