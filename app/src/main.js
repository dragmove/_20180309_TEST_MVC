import $ from 'jquery';
import Backbone from 'backbone';

(function ($) {
  'use strict';

  init();

  function init() {
    console.log('init');
    
    testModel();

    testView();
  }

  function testModel() {
    let Todo = Backbone.Model.extend({
      defaults: {
        title: '',
        completed: false
      },

      initialize: function() {
        console.log('initialize Todo');

        this.on('change', function() {
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

    // set model
    todo_2.set({
      title: 'changed title'
    });

    console.log('todo_2.hasChanged() :', todo_2.hasChanged());
    console.log('todo_2.hasChanged("title") :', todo_2.hasChanged("title"));
    console.log('todo_2.hasChanged("completed") :', todo_2.hasChanged("completed"));
  }

  function testView() {
    // see babkbone.js book 39p
  }
}($));