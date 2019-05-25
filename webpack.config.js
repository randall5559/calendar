var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');


module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'ts-loader'
          : ['babel-loader?plugins=react-hot-loader/babel', 'ts-loader']
      },
      // css
      {
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader']
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
        options: {
          context: sourcePath,
          postcss: [
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('postcss-reporter')(),
            require('postcss-browser-reporter')({ disabled: isProduction }),
          ]
        }
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "styles.css"
    }),
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: {
      warnings: false
    },
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
