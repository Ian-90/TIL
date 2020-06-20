import React from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import Button from 'components/common/Button'

const cx = classNames.bind(styles)

const Header = () => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to="/">reactblog</Link>
      </div>
      <div className={cx('right')}>
        <Button theme="outline" to="editor">
          새 포스트
        </Button>
      </div>
    </div>
  </header>
)

export default Header
