import { compose, createStore, applyMiddleware } from "redux";
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";
const engine = createEngine("participedia");
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

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

export default configureStore;
