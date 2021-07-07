import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from './root-reducer';

const persistConfig = {
        key: 'root',
        storage,
}

const middlewares = [ReduxThunk];

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
      ?    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) 
      : compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

// export default {store, persistor};