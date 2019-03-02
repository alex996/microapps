import React from 'react'
import PropTypes from 'prop-types'
import {
  Branding,
  ThemeSwitch,
  LanguagePicker
} from '../components'
import { connect } from '../redux'
import { LOCALES, EN, LIGHT, toggleTheme, changeLocale } from '../store'

const Header = ({ theme, toggleTheme, locale, locales, changeLocale }) => (
  <header>
    <Branding />

    <ThemeSwitch
      theme={theme}
      toggleTheme={toggleTheme}
    />

    <LanguagePicker
      locale={locale}
      locales={locales}
      changeLocale={changeLocale}
    />
  </header>
)

Header.propTypes = {
  changeLocale: PropTypes.func,
  locales: PropTypes.arrayOf(PropTypes.string),
  locale: PropTypes.string,
  theme: PropTypes.string,
  toggleTheme: PropTypes.func
}

Header.defaultProps = {
  changeLocale: f => f,
  locale: EN,
  locales: LOCALES,
  theme: LIGHT,
  toggleTheme: f => f
}

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
)(Header)
