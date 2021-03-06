import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import reduxThunk from 'redux-thunk'
//import { logger } from 'redux-logger'

import todoApp from './src/reducers'
import fetchToDos from './src/actions'
import HomeScreen from './src/components/HomeScreen'

// for testing only
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
  fetchTodos
} from './src/actions'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, todoApp)

const store = createStore(
  persistedReducer,
  applyMiddleware(reduxThunk, logger)
)

// Enable persistence
//persistStore(store)

/*
// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))
// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// Stop listening to state updates
unsubscribe()
*/

export default class App extends React.Component {
  componentWillMount() {
   store.dispatch(fetchTodos())
  }

  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )
  }
}
