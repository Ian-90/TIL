import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CounterBox = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  color: white;
  font-size: 3rem;
  border-radius: 100%;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.75s;
`

const Counter = ({
  number,
  color,
  index,
  onIncrement,
  onDecrement,
  onSetColor,
}) => {
  return (
    <CounterBox
      onClick={() => onIncrement(index)}
      onContextMenu={(e) => {
        e.preventDefault()
        onDecrement(index)
      }}
      onDoubleClick={() => onSetColor(index)}
      style={{ backgroundColor: color }}
    >
      {number}
    </CounterBox>
  )
}

Counter.propType = {
  index: PropTypes.number,
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func,
}

Counter.defaultProps = {
  index: 0,
  number: 0,
  color: 'black',
  onIncrement: () => {},
  onDecrement: () => {},
  onSetColor: () => {},
}

export default Counter
