const path = require('path');

module.exports = {
  /* babel-polyfill allow the use of Promise, WeakMap, static methods like 
     Array.from or Object.assign. Because it's a polyfill (which will run 
     before the source code), it need to be a dependency, not a devDependency */
  entry: ['babel-polyfill', './src/main.js'],
  module: {
    loaders: [
      {
        loader: "babel-loader",
        
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, 'src/'),
        ],
        
        // Only run `.js` files through Babel
        test: /\.js?$/,
      },
    ],
  },
 devServer: {
    contentBase: 'build'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};
