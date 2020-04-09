import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { updation } from './update.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  updation,
  users,
  alert
});

export default rootReducer;