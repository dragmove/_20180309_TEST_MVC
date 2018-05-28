import { FETCH_USER, FETCH_USER_FULFILLED, FETCH_USER_REJECTED } from '../actions/actionTypes';
import extend from 'extend';

export const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_FULFILLED:
      return extend(true, state, {
        [action.payload.login]: action.payload
      });
      break;

    default:
      return state;
  }
};

export const fetchUserError = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return null;

    case FETCH_USER_FULFILLED:
      return null;

    case FETCH_USER_REJECTED:
      return action.payload;

    default:
      return state;
  }
};
