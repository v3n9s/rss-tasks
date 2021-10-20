const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MODE = process.env.npm_lifecycle_event === 'dev' ? 'development' : 'production';
const ISDEV = MODE === 'development';

module.exports = {
  mode: MODE,
  entry: {
    main: './src/js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: ISDEV ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ISDEV,
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: ISDEV
            }
          }
        ]
      }
    ]
  },
  devServer: {
    watchFiles: ['./src'],
    static: './dist',
    port: 8080,
    liveReload: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/'),
          to: path.resolve(__dirname, 'dist/assets/')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: './styles/[name].css'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
}