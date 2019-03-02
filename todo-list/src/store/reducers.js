import {
  TOGGLE_THEME, CHANGE_LOCALE, ADD_TODO,
  TOGGLE_COMPLETE, DELETE_TODO, LIGHT, DARK, EN
} from '.'

export const initialState = {
  theme: LIGHT,
  locale: EN,
  todos: []
}

export const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === LIGHT ? DARK : LIGHT
      }
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.title,
            completed: false
          }
        ]
      }
    case TOGGLE_COMPLETE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      }
    default:
      return state
  }
}
