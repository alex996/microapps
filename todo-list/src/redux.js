import React, { createContext, useReducer, useContext } from 'react'

const Context = createContext()

export const Provider = ({ children, reducer }) => {
  const state = useReducer(reducer, undefined, reducer)

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}

const noop = () => ({})

export const connect = (
  mapStateToProps = noop,
  mapDispatchToProps = noop
) =>
  Component =>
    props => {
      const [state, dispatch] = useContext(Context)

      return <Component
        {...props}
        {...mapStateToProps(state, props)}
        {...mapDispatchToProps(dispatch, props)}
      />
    }
