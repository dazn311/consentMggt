import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
 
import { store, persistor} from './store';

import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render( 
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();