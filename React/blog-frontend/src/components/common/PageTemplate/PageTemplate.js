import React from 'react'
import classNames from 'classnames/bind'
import styles from './PageTemplate.module.scss'
import HeaderContainer from 'containers/common/HeaderContainer'
import FooterContainer from 'containers/common/FooterContainer'

const cx = classNames.bind(styles)

const PageTemplate = ({ children }) => {
  return (
    <div className={cx('page-template')}>
      <HeaderContainer />
      <main>
        {children}
      </main>
      <FooterContainer />
    </div>
  )
}

export default PageTemplate
