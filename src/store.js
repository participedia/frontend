import * as storage from "redux-storage";
import { compose, createStore, applyMiddleware } from "redux";
import createEngine from "redux-storage-engine-localstorage";
const engine = createEngine("participedia");
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
const routeMiddleware = routerMiddleware(browserHistory);
import rootReducer from "./reducers";

function configureStore() {
  const storageMiddleware = storage.createMiddleware(engine);
  const initialState = {};
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, storageMiddleware, routeMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

let store = configureStore();

export default store;
