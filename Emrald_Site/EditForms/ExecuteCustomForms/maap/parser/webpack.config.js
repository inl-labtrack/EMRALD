const path = require('path');

module.exports = {
  entry: {
    'maap-inp-parser': path.resolve('src', 'index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['babel-preset-env', { targets: { node: 'current' } }],
                'babel-preset-typescript',
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.pegjs$/,
        type: 'asset/source',
      },
    ],
  },
  output: {
    library: {
      name: 'maapInpParser',
      type: 'umd',
    },
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.pegjs'],
  },
};
