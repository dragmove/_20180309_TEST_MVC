import { combineEpics } from 'redux-observable';
import { pingEpic } from './ping';
import { fetchUserEpic } from './users';

export const rootEpic = combineEpics(pingEpic, fetchUserEpic);
