const pkg = require('./package.json'),
  gulp = require('gulp'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server');

gulp.task('webpack-dev-server', function() {
  var config = require('./webpack.config.js'),
    compiler = webpack(config);

  var server = new WebpackDevServer(compiler, config.devServer);
  server.listen(config.devServer.port, 'localhost', function(err) {
    if (err) console.error('[webpack-dev-server failed to start :', err);
  });
});
