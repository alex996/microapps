import {
  TOGGLE_THEME, CHANGE_LOCALE, ADD_TODO, TOGGLE_COMPLETE, DELETE_TODO
} from '.'

export const toggleTheme = () => ({
  type: TOGGLE_THEME
})

export const changeLocale = locale => ({
  type: CHANGE_LOCALE,
  locale
})

export const addTodo = title => ({
  type: ADD_TODO,
  title
})

export const toggleComplete = id => ({
  type: TOGGLE_COMPLETE,
  id
})

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
})
