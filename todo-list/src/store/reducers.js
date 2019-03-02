import { TOGGLE_THEME, CHANGE_LOCALE, LIGHT, DARK, EN } from '.'

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
    default:
      return state
  }
}
