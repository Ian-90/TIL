import React from 'react'
import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Footer = () => (
  <footer className={cx('footer')}>
    <Link to="/" className={cx('brand')}>reactblog</Link>
    <div className={cx('admin-login')}>관리자 로그인</div>
  </footer>
)

export default Footer
