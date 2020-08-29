import { combineReducers } from 'redux';
import { alertReducer } from './alert'
import { authReducer } from './auth';
import { jobsReducer } from './jobs';
import { themeReducer } from './theme';
import { dialogsReducer } from './dialogs';
import { activitiesReducer } from './activities';
import { usersReducer } from './users';
import { alertsReducer } from './alerts';

export default combineReducers({
  alerts: alertsReducer,
  auth: authReducer,
  jobs: jobsReducer,
  theme: themeReducer,
  dialogs: dialogsReducer,
  activities: activitiesReducer,
  users: usersReducer
});
