const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app/web': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: '/index.html',
    },
    compress: false,
    port: 3001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon/favicon-32x32.png',
      inject: true,
    }),
    new Dotenv(),
    // new WorkboxPlugin.GenerateSW({
    //   maximumFileSizeToCacheInBytes: 10 * 1000000
    // })
  ],
}
