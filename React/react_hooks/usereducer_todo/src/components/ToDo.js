import React, { useState, useRef, useEffect } from 'react'
import { DEL, COMPLETE, UNCOMPLETE, EDIT } from '../actions'
import { useDispatch } from '../context'

const ToDo = ({ text, id, isCompleted }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)
  const editInput = useRef()
  const onTextEditing = () => {
    if (isEditing) {
      dispatch({ type: EDIT, payload: { id, text: editText }})
    }
    setIsEditing(!isEditing)
  }

  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus()
    }
  }, [isEditing])
  return (
    <li key={id}>
      {
        isEditing ? (
          <input
            type="text"
            value={editText}
            ref={editInput}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onTextEditing()
              }
            }}
          />
        ) : (
          <span>{text}</span>
        )
      }
      <span onClick={() => dispatch({ type: DEL, payload: id })}>❌</span>
      <span onClick={() => dispatch({ type: isCompleted ? UNCOMPLETE : COMPLETE, payload: id })}>{isCompleted ? "🙅🏼‍♂️" : "✅"}</span>
      <span onClick={onTextEditing}>{isEditing ? "completed" : "🛠"}</span>
    </li>
  )  
}

export default ToDo