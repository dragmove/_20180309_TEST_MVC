import { state } from './state';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actionTypes';

const initialState = Object.assign({}, state);

/*
 * reducer
 */
export function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
      break;

    default :
      return state;
  }
}

export function todos(state = [], action) {
  console.log('state :', state);

  switch (action.type) {
    case ADD_TODO:
      let arr = Array.prototype.slice(state);
      arr.push({
        text: action.text,
        completed: false
      });

      console.log('ADD_TODO arr :', arr);

      return arr;
      break;

    case COMPLETE_TODO:
      let arr = Array.prototype.slice(state);

      console.log('COMPLETE_TODO arr :', arr);

      // TODO

      return arr;

      /*
       return [
       ...state.todos.slice(0, action.index),
       Object.assign({}, state.todos[action.index], {
       completed: true
       }),
       ...state.todos.slice(action.index + 1)
       ];
       */
      break;

    default :
      return state;
  }
}

/*
 export function todoApp(state = {}, action) {
 return {
 visibilityFilter:: visibilityFilter(state.visibilityFilter, action),
 todos: todos(state.todos, action)
 };
 }
 */