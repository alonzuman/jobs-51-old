import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { jobsReducer } from './jobs';
import { themeReducer } from './theme';
import { dialogsReducer } from './dialogs';
import { activitiesReducer } from './activities';
import { usersReducer } from './users';
import { feedbackReducer } from './feedback';
import { constantsReducer } from './constants';

export default combineReducers({
  feedback: feedbackReducer,
  auth: authReducer,
  jobs: jobsReducer,
  theme: themeReducer,
  dialogs: dialogsReducer,
  activities: activitiesReducer,
  users: usersReducer,
  constants: constantsReducer
});
