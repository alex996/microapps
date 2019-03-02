# Todo List

To-do list app using React [Context API](https://reactjs.org/docs/context.html) (16.3) and [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) hook (16.8).

## Motivation

Demonstrate a global context-based store with a Redux-like action system.

## Disclaimer

Context API is best suited for [low frequency updates](https://github.com/facebook/react/issues/14110#issuecomment-448074060) (e.g. theme, locale, auth, modals, etc.). High frequency updates (e.g. forms in draft state) should be reserved for local state. Keep in mind that whenever the state in the context provider changes, all its consumers [will get re-rendered](https://reactjs.org/docs/context.html#contextprovider), whether they are connected to the updated property or not.

## Inspiration

Alternative implementations are illustrated on [Medium](https://medium.com/maxime-heckel/rebuilding-redux-with-hooks-and-context-e16b59faf51c) and in [`f/react-hooks-todo-app`](https://github.com/f/react-hooks-todo-app).

## TODO

- centralize prop types
- memoize callbacks
- styling
