import React from 'react'
import PropTypes from 'prop-types'
import { LOCALES, EN } from '../store'

const LanguagePicker = ({ locale, locales, changeLocale }) => (
  <select value={locale} onChange={changeLocale}>
    {locales.map(lang => (
      <option
        key={lang}
        value={lang}
      >
        {lang.toUpperCase()}
      </option>
    ))}
  </select>
)

LanguagePicker.propTypes = {
  changeLocale: PropTypes.func,
  locales: PropTypes.arrayOf(PropTypes.string),
  locale: PropTypes.string
}

LanguagePicker.defaultProps = {
  changeLocale: f => f,
  locale: EN,
  locales: LOCALES
}

export default LanguagePicker
