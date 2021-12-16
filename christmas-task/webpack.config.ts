import path from 'path';

import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default ({ mode }: { mode: 'dev' | undefined }) => {
  const ISDEV = mode === 'dev';

  return <webpack.Configuration>{
    entry: path.resolve(__dirname, './src/scripts/index.ts'),
    mode: ISDEV ? 'development' : 'production',
    devtool: ISDEV ? 'source-map' : false,
    devServer: {
      liveReload: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            {
              loader: ISDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.tsx?$/i,
          use: ['ts-loader'],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: './styles/[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets'),
            to: path.resolve(__dirname, '../dist/assets'),
          },
        ],
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: './js/[name].js',
      clean: true,
    },
  };
};
