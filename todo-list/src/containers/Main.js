import React from 'react'
import PropTypes from 'prop-types'
import { TodoForm, TodoList } from '../components'
import { addTodo, toggleComplete, deleteTodo } from '../store'
import { connect } from '../redux'

const Main = ({ addTodo, todos, toggleComplete, deleteTodo }) => (
  <main>
    <TodoForm addTodo={addTodo} />

    <TodoList
      todos={todos}
      toggleComplete={toggleComplete}
      deleteTodo={deleteTodo}
    />
  </main>
)

Main.propTypes = {
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool
  })),
  toggleComplete: PropTypes.func
}

Main.defaultProps = {
  addTodo: f => f,
  deleteTodo: f => f,
  todos: [],
  toggleComplete: f => f
}

const mapStateToProps = ({ todos }) => ({ todos })

const mapDispatchToProps = dispatch => ({
  addTodo: title => dispatch(addTodo(title)),
  toggleComplete: id => dispatch(toggleComplete(id)),
  deleteTodo: id => dispatch(deleteTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
