import React from 'react'
import classNames from 'classnames/bind'
import styles from './ListWrapper.module.scss'

const cx = classNames.bind(styles)

const ListWrapper = ({ children }) => (
  <div className={cx('list-wrapper')}>
    {children}
  </div>
)

export default ListWrapper
