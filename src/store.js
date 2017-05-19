import * as storage from "redux-storage";
import { compose, createStore, applyMiddleware } from "redux";
import createEngine from "redux-storage-engine-localstorage";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const engine = createEngine("participedia");

function configureStore() {
  const storageMiddleware = storage.createMiddleware(engine);
  const initialState = {};
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, storageMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

let store = configureStore();

export default store;
