const path = require('path'),
  webpack = require('webpack'),
  dirName = path.resolve('./');

module.exports = {
  entry: {
    main: ['./app/src/main.js']
  },

  output: {
    filename: "[name].js",
    path: path.resolve(dirName, 'app/build')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["env"/*, {
                "modules": false // if you use tree shaking, remove comments. this is core of tree shaking in webpack-dev-server environment. 'ㅅ')!
              }*/]
            ]
          }
        }
      }
    ]
  },

  devtool: 'source-map', // https://webpack.js.org/configuration/devtool/

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // develop build setting
      sourceMap: true,
      mangle: false,
      output: {
        beautify: true,
        comments: true
      },
      compress: {
        unused: true,
        drop_console: false
      }

      /*
      // production build setting
       sourceMap: false, // production build setting does not include main.map.js file.
       mangle: true,
       output: {
       beautify: false,
       comments: false
       },
       compress: {
       unused: true,
       drop_console: true
       }
       */
    })
  ],

  devServer: {
    contentBase: './app',
    noInfo: true,
    host: '',
    port: 9000,
    hot: true,
    inline: true
  }
};