const path = require(`path`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  optimization: {
    splitChunks: {
      minSize: 250000,
      maxSize: 300000
    }
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    open: true,
    port: 1337,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.[hash].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      },
      chunks: ['main']
    })
  ]
};
