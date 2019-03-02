import { TOGGLE_THEME, CHANGE_LOCALE } from '.'

const light = 'light'
const dark = 'dark'
const en = 'en'

const initialState = {
  theme: light,
  locale: en,
  auth: null
}

export const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === light ? dark : light
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
