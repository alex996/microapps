import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('')

  const handleChange = e => setTitle(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    if (!title) return

    addTodo(title)

    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={handleChange}
        placeholder='Type here...'
      />
      <button>Add</button>
    </form>
  )
}

TodoForm.propTypes = {
  addTodo: PropTypes.func
}

TodoForm.defaultProps = {
  addTodo: f => f
}

export default TodoForm
