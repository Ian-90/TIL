import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import { Link } from 'react-router-dom'

function Todo({ text, deleteTodo, id }) {
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
      </Link>
      <button onClick={deleteTodo}>Del</button>
    </li>
  )
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteTodo: () => dispatch(actionCreators.deleteTodo(ownProps.id))
  }
}

export default connect(null, mapDispatchToProps)(Todo)