const path = require( 'path' );
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const DIST = path.resolve( __dirname, './dist' );

const extractStyles = loaders => ( process.env.NODE_ENV === 'production'
  ? ExtractTextPlugin.extract( {
    fallback: 'style-loader',
    use: loaders,
  } )
  : ['style-loader'].concat( loaders ) );

module.exports = {
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.jsx',
  ],
  output: {
    path: DIST,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '../../theme.config$': path.join( __dirname, 'semantic-theme/theme.config' ),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: path.join( __dirname, 'src' ),
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: extractStyles( ['css-loader', 'less-loader'] ),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
      },
    ],
  },
  plugins: [
    // Remove dist folder before building.
    new CleanWebpackPlugin( DIST ),
    // Extract text from a bundle, or bundles, into a separate file.
    new ExtractTextPlugin( {
      filename: '[name].[contenthash].css',
    } ),
    // Create copy of index.html
    new HtmlWebpackPlugin( {
      filename: 'index.html',
      template: 'index.html',
    } ),
    // Copy assets folder to dist
    new CopyWebpackPlugin( [
      { from: './src/assets', to: './assets' },
      { from: 'index.html' },
    ] ),
    // new BundleAnalyzerPlugin(),
  ],
};
