import { ofType } from 'redux-observable';
import { FETCH_USER, FETCH_USER_FULFILLED } from '../actions/actionTypes';
import { fetchUser, fetchUserFulfilled } from '../actions/users';
import { ajax } from 'rxjs/Observable/dom/ajax';

export const fetchUserEpic = (action$, store) => {
  // console.log('store has getState(), dispatch() methods. but, do not use store.dispatch in epic');

  return action$.ofType(FETCH_USER).mergeMap(action => {
    return ajax.getJSON(`https://api.github.com/users/${action.payload}`).map(response => fetchUserFulfilled(response));
  });
};
