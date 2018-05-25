export const state = {
  visibilityFilter: 'SHOW_ALL',

  todos: [
    {
      text: 'Consider using Redux',
      completed: false
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ],

  reddits: {
    selectedReddit: 'frontend',
    entities: {
      users: {
        2: {
          id: 2,
          name: 'Andrew'
        }
      },

      posts: {
        42: {
          id: 42,
          title: 'Confusion about Flux and Relay',
          author: 2
        },

        100: {
          id: 100,
          title: 'Creating a Simple Application Using React JS and Flux Architexture',
          author: 2
        }
      }
    },

    postsByReddit: {
      frontend: {
        isFetching: false,
        didInvalidate: false,
        items: []
      },

      reactjs: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 1524450057807,
        items: [42, 100]
      }
    }
  },

  ping: {
    isPinging: false
  },

  users: {}
};
