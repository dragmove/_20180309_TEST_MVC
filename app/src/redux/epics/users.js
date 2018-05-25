import { ofType } from 'redux-observable';
import { FETCH_USER, FETCH_USER_FULFILLED } from '../actions/actionTypes';
import { fetchUser, fetchUserFulfilled } from '../actions/users';
import { ajax } from 'rxjs/Observable/dom/ajax';

export const fetchUserEpic = action$ =>
  action$.ofType(FETCH_USER).mergeMap(action => {
    return ajax.getJSON(`https://api.github.com/users/${action.payload}`).map(response => fetchUserFulfilled(response));
  });
