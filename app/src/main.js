import $ from 'jquery';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { selectReddit, fetchPosts } from './redux/actions/reddits';
import { state } from './redux/state/state';

import reducers from './redux/reducers/index';
import { VisibilityFilters } from './redux/actions/index';
import { addTodo, completeTodo, setVisibilityFilter } from './redux/actions/index';

import Backbone from 'backbone';
import _ from 'underscore';

import { merge } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import Rx from 'rxjs/Rx';

(function ($) {
  'use strict';

  init();

  function init() {
    console.log('init');

    testRedux();
    // testRxJS();
    // testBackbone();
  }

  function testRedux() {
    const initialState = Object.assign({}, state);

    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
    const store = createStoreWithMiddleware(reducers, initialState);

    let unsubscribeStore = store.subscribe(() => {
      console.log('store.getState() :', store.getState());

      // render view
    });

    store.dispatch(selectReddit('reactjs'));

    /*
    const VisibilityFilters = {
      SHOW_ALL: 'SHOW_ALL',
      SHOW_COMPLETE: 'SHOW_COMPLETE',
      SHOW_ACTIVE: 'SHOW_ACTIVE'
    };

    const initialState = Object.assign({}, state);

    let store = createStore(reducers, initialState);

    let unsubscribeStore = store.subscribe(() => {
      console.log('store.getState() :', store.getState());

      // render view
    });

    // dispatch event
    store.dispatch(addTodo('Learn about action'));
    store.dispatch(addTodo('Learn about reducers'));
    store.dispatch(addTodo('Learn about store'));

    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETE));

    store.dispatch(completeTodo(0));
    store.dispatch(completeTodo(1));
    */
  }

  function testRxJS() {
    // test RxJS Subject. subscribe change state by action (redux)

    const defaultState = {
      width: 0,
      height: 0
    };

    function factory(reducerByType, initialState) {
      const action$ = new Rx.Subject();

      const state$ = action$
        .startWith(initialState)
        .scan((state, action) => {
          if (reducerByType.hasOwnProperty(action.type)) return reducerByType[action.type](state, action);

          return state;
        })
        .distinctUntilChanged();

      return {
        action$,
        state$,
        dispatch: action => action$.next(action)
      }
    }

    const {state$, dispatch} = factory({
      ADD: (state, action) => {
        return Object.assign({}, state, {
          width: action.width,
          height: action.height
        });
      },

      SUBTRACT: (state, action) => {
        return Object.assign({}, state, {
          width: action.width,
          height: action.height
        });
      }
    }, defaultState);

    state$.subscribe(val => {
      console.log('val :', val);
    });

    dispatch({
      type: 'ADD',
      width: 10,
      height: 20
    });

    dispatch({
      type: 'SUBTRACT',
      width: 15,
      height: 20
    });

    /*
     const source$ = Rx.Observable.fromEvent(window, 'resize');
     const debounce$ = source$.debounceTime(1000);
     const subscribe$ = debounce$.subscribe(val => console.log(val));
     */
  }

  function testBackbone() {
    testModel();
    testView();
    testCollection();
  }

  function testModel() {
    let Todo = Backbone.Model.extend({
      defaults: {
        title: '',
        completed: false
      },

      initialize: function () {
        console.log('initialize Todo :', this);

        this.on('change', function () {
          console.log('model has changed :', this.attributes);
        });
      }
    });

    let todo_1 = new Todo();
    console.log('todo_1 :', todo_1);

    let todo_2 = new Todo({
      title: 'hello model',
      completed: true
    });

    console.log('todo_2 :', todo_2);
    console.log('todo_2.get("title") :', todo_2.get("title"));
    console.log('todo_2.hasChanged() before change :', todo_2.hasChanged());

    // set model
    todo_2.set({
      title: 'changed title'
    });

    console.log('todo_2.hasChanged() after change :', todo_2.hasChanged());
    console.log('todo_2.hasChanged("title") :', todo_2.hasChanged("title"));
    console.log('todo_2.hasChanged("completed") :', todo_2.hasChanged("completed"));
  }

  function testView() {
    // see babkbone.js book 39p

    let TodoView = Backbone.View.extend({
      initialize: function () {
        this.model.bind('change', _.bind(this.render, this));
      },

      tagName: 'li',

      todoTpl: _.template('An example template'),

      events: {
        'click .toggle': 'toggleCompleted',
        'dbclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
      },

      render: function () {
        this.$el.html(this.todoTpl(this.model.toJSON()));

        this.input = this.$('.edit');

        return this;
      },

      edit: function () {
        console.log('edit');
      },

      close: function () {
        console.log('close');
      },

      updateOnEnter: function (event) {
        console.log('updateOnEnter:', event);
      }
    });

    let ItemView = Backbone.View.extend({
      events: {},

      render: function () {
        this.$el.html(this.model.toJSON());

        return this;
      }
    });

    let ListView = Backbone.View.extend({
      render: function () {
        let items = this.model.get('items');

        _.each(items, function (item) {
          let itemView = new ItemView({model: item});
          this.$el.append(itemView.render().el);
        });

        this.$el.html(this.model.toJSON());

        return this;
      }
    });
  }

  function testCollection() {
    let Todo = Backbone.Model.extend({
      default: {
        title: '',
        completed: false
      }
    });

    let TodosCollection = Backbone.Collection.extend({
      model: Todo
    });

    let a = new Todo({title: 'go to home', id: 1}),
      b = new Todo({title: 'go to company', id: 2}),
      c = new Todo({title: 'go to shop', id: 3});

    var todos = new TodosCollection([a, b]);
    todos.on('add', function (todo) {
      console.log('added Todo title :', todo.get('title'))
    });

    todos.on('change:title', function (model) {
      console.log(`changed Todo model's title :`, model.get('title'));
    });

    todos.on('remove', function (model) {
      console.log(`removed Todo model's title :`, model.get('title'));
    });

    todos.add(c);
    console.log('after add new Todo, todos.length :', todos.length);

    let todo_2 = todos.get(2);
    console.log('todo_2 :', todo_2);

    todo_2.set('title', 'go fishing');

    let todoCid = todos.get(todo_2.cid);
    console.log('todoCid :', todoCid);
    console.log('todoCid === b :', todoCid === b);

    todos.remove([a, b]);
    console.log('todos.length :', todos.length);

    // reset, update event
  }
}($));