import { state } from './state';
import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT, KEY_UP } from './actionTypes';

const initialState = Object.assign({}, state);

/*
 * utils
 */
export function updateObject(oldObj, newValues) {
  return Object.assign({}, oldObj, newValues);
}

/*
 * reducer
 */
export function countReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT :
      return updateObject(state, {
        index: action.index + 1
      });
      break;

    case DECREMENT :
      return updateObject(state, {
        index: action.index - 1
      });
      break;

    default :
      return state;
  }
}

export function keyHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case KEY_UP :
      return updateObject(state, {
        keyCodes: state.keyCodes + action.keyCode
      });
      break;

    default :
      return state;
  }
}