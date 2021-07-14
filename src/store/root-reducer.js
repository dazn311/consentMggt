import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import consentReducer from './consent/cons.reducer';
import eventsReducer from './consent/events/evt.reducer';
import adminPanelTrest from './adminPanelTrest/adminPanelTrest.reducer';
import userReducer from './user/user.reducer';
import objReducer from './objs/obj.reducer';
import themeReducer from './themes/theme.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['adminPanel,obj']
}

const rootReducer = combineReducers({
  consRed: consentReducer,
  evtRed: eventsReducer,
  adminPanel: adminPanelTrest,
  user: userReducer,
  obj: objReducer,
  theme: themeReducer
});

export default persistReducer(persistConfig, rootReducer);