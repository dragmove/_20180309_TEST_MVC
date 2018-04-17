import { INCREMENT, DECREMENT, KEY_UP } from './actionTypes';

export function increment(index) {
  return {
    type: INCREMENT,
    index: index
  };
}

export function decrement(index) {
  return {
    type: DECREMENT,
    index: index
  };
}

export function keyUp(keyCode) {
  return {
    type: KEY_UP,
    keyCode: keyCode
  };
}