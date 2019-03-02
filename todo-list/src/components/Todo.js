import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ title, completed, onComplete, onDelete }) => (
  <>
    <input
      type='checkbox'
      value={completed}
      onChange={onComplete}
    />
    <span>{title}</span>
    <button onClick={onDelete}>
      X
    </button>
  </>
)

Todo.onComplete = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  onComplete: PropTypes.func,
  onDelete: PropTypes.func
}

Todo.defaultProps = {
  title: '',
  completed: false,
  onComplete: f => f,
  onDelete: f => f
}

export default Todo
