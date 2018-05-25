import { FETCH_USER, FETCH_USER_FULFILLED } from '../actions/actionTypes';
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
