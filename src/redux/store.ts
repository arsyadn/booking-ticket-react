import { applyMiddleware, createStore, compose, Store } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Persistor } from "redux-persist";

// Define RootState type from your rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// For Redux DevTools extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "login-user",
  storage,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const globalStore: Store<RootState> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk as any))
);

const persistor: Persistor = persistStore(globalStore);

export { globalStore, persistor };
