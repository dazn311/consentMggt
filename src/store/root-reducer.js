import { combineReducers } from 'redux';


// import consentReducer from './consent/cons.reducer';
import eventsReducer from './consent/events/evt.reducer';
import adminPanelTre from './adminPanelTrest/adminPanelTrest.reducer';
import userReducer from './user/user.reducer';
import objReducer from './objs/obj.reducer';
import themeReducer from './themes/theme.reducer';
import genPageReducer from './genPageState/gen.reducer';



export const rootReducer = combineReducers({
  // consRed: consentReducer,
  evtRed: eventsReducer,
  adminPanel: adminPanelTre,
  user: userReducer,
  obj: objReducer,
  theme: themeReducer,
  genRed: genPageReducer,
});

// export default persistReducer(persistConfig, rootReducer);

// sessionStorage.clear();
// const persistConfig = {
//   key: 'root',
//   storage,
//   // storage: sessionStorage,
//   whitelist: ['adminPanel,obj']
// }

// import { persistReducer  } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/storage/session';

