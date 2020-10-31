import React from 'react'

const List = ({ name, children }) => (
  <>
    <h1>{name}</h1>
    <ul>{children}</ul>
  </>
)

export default List
