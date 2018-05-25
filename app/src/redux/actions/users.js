import { FETCH_USER, FETCH_USER_FULFILLED } from './actionTypes';

// action creators (aka factories)
export const fetchUser = username => ({
    type: FETCH_USER,
    payload: username
});

export const fetchUserFulfilled = payload => ({
    type: FETCH_USER_FULFILLED,
    payload
});
