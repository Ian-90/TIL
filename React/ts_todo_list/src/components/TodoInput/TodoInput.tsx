import React from 'react'
import classNames from 'classnames/bind'
import styles from './TodoInput.module.scss'

const cx = classNames.bind(styles)

interface TodoProps {
  value: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
  onInsert: (event?: React.MouseEvent<HTMLDivElement>) => void;
}

const TodoInput:React.FC<TodoProps> = ({ value, onChange, onInsert }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onInsert()
    }
  }
  return (
    <div className={cx('todo-input')}>
      <input onChange={onChange} value={value} onKeyPress={handleKeyPress} />
      <div className={cx('add-button')} onClick={onInsert}>추가</div>
    </div>
  )
}

export default TodoInput
