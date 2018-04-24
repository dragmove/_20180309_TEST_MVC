import {SELECT_REDDIT, INVALIDATE_REDDIT, REQUEST_POSTS, RECEIVE_POSTS} from '../actions/actionTypes';
import extend from 'extend';

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit;
      break;

    default:
      return state;
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
      break;

    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
      break;

    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
      break;

    default :
      return state;
  }
}

function postsByReddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      });

    default :
      return state;
  }
}

export const reddits = (state = {selectedReddit: '', entities: {}, postsByReddit: {}}, action) => {
  console.log('reddits reducer - action :', action);

  switch (action.type) {
    case SELECT_REDDIT:
      return extend(true, {}, state, {
        selectedReddit: selectedReddit(state.selectedReddit, action)
      });

    case INVALIDATE_REDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return extend(true, {}, state, {
        postsByReddit: postsByReddit(state.postsByReddit, action)
      });

    default:
      return state;
  }
}