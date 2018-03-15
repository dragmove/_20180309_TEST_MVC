import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

(function ($) {
  'use strict';

  init();

  function init() {
    console.log('init');
    
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

      initialize: function() {
        console.log('initialize Todo :', this);

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
      initialize: function() {
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

      render: function() {
        this.$el.html(this.todoTpl(this.model.toJSON()));

        this.input = this.$('.edit');

        return this;
      },

      edit: function() {
        console.log('edit');
      },

      close: function() {
        console.log('close');
      },

      updateOnEnter: function(event) {
        console.log('updateOnEnter:', event);
      }
    });

    let ItemView = Backbone.View.extend({
      events: {},

      render: function() {
        this.$el.html(this.model.toJSON());

        return this;
      }
    });

    let ListView = Backbone.View.extend({
      render: function() {
        let items = this.model.get('items');

        _.each(items, function(item) {
          let itemView = new ItemView({ model: item });
          this.$el.append( itemView.render().el );
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
    console.log('todos.length :', todos.length);

    todos.add(c);
    console.log('todos.length :', todos.length);

    let todo_2 = todos.get(2);
    console.log('todo_2 :', todo_2);

    let todoCid = todos.get(todo_2.cid);
    console.log('todoCid :', todoCid);
    console.log('todoCid === b :', todoCid === b);

    todos.remove([a, b]);
    console.log('todos.length :', todos.length);
  }
}($));