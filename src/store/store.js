import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

// import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [ReduxThunk];

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
      ?    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) 
      : compose;

// if (process.env.NODE_ENV === 'development') {
//     middlewares.push(logger);
// }

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

// export default {store, persistor};