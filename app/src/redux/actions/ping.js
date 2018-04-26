import { PING, PONG } from './actionTypes';

export function ping() {
  return {
    type: PING
  };
}

export function pong() {
  return {
    type: PONG
  };
}