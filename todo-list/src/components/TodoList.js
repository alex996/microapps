import React from 'react'
import PropTypes from 'prop-types'
import { Todo } from '.'

const TodoList = ({ todos, toggleComplete, deleteTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo
          {...todo}
          onComplete={() => toggleComplete(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
        />
      </li>
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool
  })),
  toggleComplete: PropTypes.func,
  deleteTodo: PropTypes.func
}

TodoList.defaultProps = {
  todos: [],
  toggleComplete: f => f,
  deleteTodo: f => f
}

export default TodoList
