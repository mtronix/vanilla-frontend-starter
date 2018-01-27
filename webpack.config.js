const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const tools = require('./tools');

const SRC_PATH = path.resolve(__dirname, 'src');
const DEST_PATH = path.resolve(__dirname, 'dist');
const DEV = process.env.NODE_ENV === 'development';
const MINIFY = process.env.MINIFY === 'true';

const TPL_PATH = path.resolve(SRC_PATH, 'tpl');
const PUBLIC_PATH = '/';

var config = {
  entry: {
    app: ['babel-polyfill', path.resolve(SRC_PATH, 'main.js')]
  },
  output: {
    path: DEST_PATH,
    publicPath: PUBLIC_PATH,
    filename: DEV ? '[name].js' : '[name]-[hash:10].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: !MINIFY
        }
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: MINIFY,
                importLoaders: 1
              }
            },
            'postcss-loader',
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /.(jpg|jpeg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: PUBLIC_PATH,
          outputPath: 'assets/images/',
          name: DEV ? '[name].[ext]' : '[name]-[sha256:hash:10].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          publicPath: PUBLIC_PATH,
          outputPath: 'assets/fonts/',
          name: DEV ? '[name].[ext]' : '[name]-[sha256:hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([DEST_PATH]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      'DEV': JSON.stringify(DEV)
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      '_': 'lodash',
      'Popper': ['popper.js', 'default']
    }),
    new ExtractTextPlugin({
      filename: DEV ? '[name].css' : '[name]-[hash:10].css'
    }),
    ...tools.scanDir(TPL_PATH, /^[^_]+\.pug$/)
    .map(file => {
      let relativePath = path.relative(TPL_PATH, file);
      let relativeDir = path.dirname(relativePath);

      if (relativeDir === '.') relativeDir = '';

      return new HtmlWebpackPlugin({
        template: file,
        filename: relativePath.replace(/\.pug$/, '.html'),
        publicPath: PUBLIC_PATH,
        dir: relativeDir,
        inject: false
      })
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      SRC_PATH
    ],
    alias: {
      '@': SRC_PATH
    }
  }
};

switch (process.env.NODE_ENV) {
  case 'development':
  default:
    config = merge(config, {
      devServer: {
        contentBase: DEST_PATH,
        port: 8080,
        open: true,
        overlay: true
      },
      devtool: 'source-map'
    });
    break;

  case 'production':
    config = merge(config, {
      plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: module => module.context && module.context.includes('node_modules')
        }),
        new webpack.HashedModuleIdsPlugin({
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 5
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            discardComments: {
              removeAll: MINIFY
            }
          }
        }),
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: MINIFY && {
              drop_console: true
            },
            mangle: MINIFY,
            comments: !MINIFY
          }
        })
      ]
    });
    break;
}

module.exports = config;