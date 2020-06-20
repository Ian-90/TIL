import React from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Button = ({
  children,
  to,
  onClick,
  disabled,
  theme = 'default'
}) => {
  const Element = (to && !disabled) ? Link : Div
  return (
    <Element
      to={to}
      className={cx('button', theme, { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </Element>
  )
}

export default Button
