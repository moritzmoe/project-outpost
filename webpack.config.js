const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /*
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
*/
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8081'
    },
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new WebpackPwaManifest({
      name: 'Outpost',
      short_name: 'Outpost',
      description: 'Show how consumers can make their behaviour more environmentally friendly.',
      background_color: '#FFFFFF',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('./public/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        },
        {
          src: path.resolve('./public/large-icon.png'),
          size: '1024x1024'
        },
        {
          src: path.resolve('./public/maskable-icon.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }
      ]
    })
  ]
};
