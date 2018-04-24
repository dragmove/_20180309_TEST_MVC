import {SELECT_REDDIT, INVALIDATE_REDDIT, REQUEST_POSTS, RECEIVE_POSTS} from './actionTypes';
import 'whatwg-fetch';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

export function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  console.log('posts :', posts);

  if (!posts) {
    return true;

  } else if (posts.isFetching) {
    return false;

  } else {
    return posts.didInvalidate;
  }
}

/*
 * thunk action creators
 */
export function fetchPosts(reddit) {
  return function (dispatch) {
    dispatch(requestPosts(reddit));

    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
      .catch(function (error) {
        // TODO: catch error
      });
  };
}

export function fetchPostsIfNeeded(reddit) {
  return function(dispatch, getState) {
    console.log('fetchPostsIfNeeded getState() :', getState());

    if(shouldFetchPosts(getState().reddits, reddit)) {
      return dispatch(fetchPosts(reddit));

    } else {
      return Promise.resolve();
    }
  };
}