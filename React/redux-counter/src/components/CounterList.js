import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Counter from './Counter'

const CounterListBox = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const CounterList = ({
  counters,
  onIncrement,
  onDecrement,
  onSetColor,
}) => {
  const counterList = counters.map((counter, i) => (
    <Counter
      key={i}
      index={i}
      { ...counter }
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onSetColor={onSetColor}
    />
  ))

  return (
    <CounterListBox>
      {counterList}
    </CounterListBox>
  )
}

CounterList.propType = {
  counters: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    number: PropTypes.number,
  })),
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func,
}

CounterList.defaultProps = {
  counters: [],
  onIncrement: () => {},
  onDecrement: () => {},
  onSetColor: () => {},
}

export default CounterList
