import { ofType } from 'redux-observable';
import { PING } from '../actions/actionTypes';
import { pong } from '../actions/ping';

// set redux-observable epic for async
export const pingEpic = action$ =>
    action$
        .ofType(PING)
        .delay(1500)
        .mapTo(pong());
