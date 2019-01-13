module.exports = {
  entry: 'src/index',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require('path').resolve('../index.js'),
              options: {
                /* ... */
              }
            }
          ]
        }
      ]
    }
  },
  plugins: [
    {
      resolve: '@poi/plugin-eslint'
    }
  ]
}
