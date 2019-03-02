import React from 'react'
import { connect } from '../redux'
import { toggleTheme, changeLocale } from '../store'

const App = ({ theme, locale, toggleTheme, changeLocale }) => <>
  <h1>Theme: {theme}</h1>

  <button onClick={toggleTheme}>Toggle Theme</button>

  <h1>Locale: {locale}</h1>

  <select onChange={changeLocale}>
    <option value='en'>EN</option>
    <option value='fr'>FR</option>
  </select>
</>

const mapStateToProps = ({ theme, locale }) => ({
  theme, locale
})

const mapDispatchToProps = dispatch => ({
  toggleTheme: () => dispatch(toggleTheme()),
  changeLocale: e => dispatch(changeLocale(e.target.value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
