import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import { reddits } from './reddits';

export default combineReducers({
  todos,
  visibilityFilter,
  reddits
});