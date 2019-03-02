import { TOGGLE_THEME, CHANGE_LOCALE } from '.'

export const toggleTheme = () => ({
  type: TOGGLE_THEME
})

export const changeLocale = locale => ({
  type: CHANGE_LOCALE,
  locale
})
