import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonBox = styled.div`
  display: flex;
`

const Button = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center:
  height: 3rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`

const AddBtn = styled(Button)`
  background: #37b24d;

  &:hover {
    background: #40c057;
  }
`

const RemoveBtn = styled(Button)`
  background: #f03e32;

  &:hover {
    background: #fa5252;
  }
`

const Buttons = ({ onCreate, onRemove }) => {
  return (
    <ButtonBox>
      <AddBtn onClick={onCreate}>생성</AddBtn>
      <RemoveBtn onClick={onRemove}>제거</RemoveBtn>
    </ButtonBox>
  )
}

Buttons.defaultProps = {
  onCreate: () => {},
  onRemove: () => {},
}

Buttons.propTypes = {
  onCreate: PropTypes.func,
  onRemove: PropTypes.func,
}

export default Buttons
