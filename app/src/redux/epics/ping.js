import { ofType } from 'redux-observable';
import { pong } from '../actions/ping';

// set redux-observable epic for async
export const pingEpic = action$ => {
  return action$.ofType('PING')
    .delay(1500)
    .mapTo(pong());
};