import {
  FETCH_USER,
  FETCH_USER_FULFILLED,
  FETCH_USER_CANCELLED
} from './actionTypes';

// action creators (aka factories)
export const fetchUser = username => ({
  type: FETCH_USER,
  payload: username
});

export const fetchUserFulfilled = payload => ({
  type: FETCH_USER_FULFILLED,
  payload
});

export const cancelFetchUser = () => ({ type: FETCH_USER_CANCELLED });
