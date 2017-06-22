var path = require('path');
var paths = require('./paths');

var publicPath = paths.servedPath;

module.exports = {
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    filename: 'main.js',
    path: paths.appBuild,
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include:  paths.appSrc
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include:  paths.appSrc,
        exclude: paths.appTestData+'/*.js',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        use: [
            'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};