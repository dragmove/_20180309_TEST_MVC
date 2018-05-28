import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { FETCH_USER, FETCH_USER_FULFILLED, FETCH_USER_CANCELLED, FETCH_USER_REJECTED } from '../actions/actionTypes';
import { fetchUser, fetchUserFulfilled, fetchUserRejected } from '../actions/users';
import { ajax } from 'rxjs/Observable/dom/ajax';

export const fetchUserEpic = (action$, store) => {
  // console.log('store has getState(), dispatch() methods. but, do not use store.dispatch in epic');

  // This example uses mergeMap (aka flatMap), which means it allows multiple concurrent FETCH_USER requests. If you instead want to cancel any pending request and instead switch to the latest one, you can use the switchMap operator.
  return action$.ofType(FETCH_USER).mergeMap(action => {
    return ajax
      .getJSON(`https://api.github.com/users/${action.payload}`)
      .map(response => fetchUserFulfilled(response))
      .catch(error => {
        console.log('error :', error);

        // TODO: how display error ?
        return Observable.of(fetchUserRejected(error.xhr.response));
      })
      .takeUntil(action$.ofType(FETCH_USER_CANCELLED));
  });
};
