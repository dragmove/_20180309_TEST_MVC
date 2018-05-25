import { combineReducers } from 'redux';
import { todos } from './todos';
import { visibilityFilter } from './visibilityFilter';
import { reddits } from './reddits';
import { ping } from './ping';
import { users } from './users';

export const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  reddits,
  ping,
  users
});
