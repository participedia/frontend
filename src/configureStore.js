import {compose, createStore, applyMiddleware} from 'redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
const engine = createEngine('my-save-key')
// import persistState from "redux-localstorage"
// import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import rootReducer from './reducers'

function configureStore () {
  const storageMiddleware = storage.createMiddleware(engine)
  // const loggerMiddleware = createLogger()

  const initialState = {}
  // const withStorage = applyMiddleware(storageMiddleware)(createStore);
  // const withPromise = applyMiddleware(promiseMiddleware)(withStorage);
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware,
        storageMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  // // if (process.env.NODE_ENV !== 'production') {
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(rootReducer)
  //   })
  // }
  // // }

  return store
}

export default configureStore
