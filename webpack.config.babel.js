import HtmlWebpackPlugin from 'html-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import path from 'path'
import Dotenv from 'dotenv-webpack'

export default {
  mode: 'development',
  entry: {
    client: './src/client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist_dev'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: './[name].[ext]'
          },
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src/client/')
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new Dotenv({
      path: './.env'
    })
  ],
  //webpack-dev-server用設定
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, 'dist_dev'),
    publicPath: '/',
    historyApiFallback: true,
    writeToDisk: true,  // メモリに保存するのではなく、出力させておく
    watchContentBase: true,
    host: 'localhost',
    port: 5000
  },
  devtool: 'inline-source-map'
}
