import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const jsOutputPath = 'js/app.js';
const cssOutputPath = 'css/app.min.css';

const ExtractSASS = new ExtractTextPlugin(cssOutputPath);

const loaders = [
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: [
            'transform-runtime',
            'transform-object-rest-spread'
        ],
      },
    },
  },
  {
    test: /\.(sass|scss)$/,
    include: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/sass'),
    ],
    use: ExtractSASS.extract({
      use: [
        {
          loader: "css-loader",
          options: {
            minimize: true,
          }
        },
        {
          loader: "sass-loader"
        }
      ],
      fallback: "style-loader"
    }),
  },
  {
    test: /\.css$/,
    include: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/sass'),
    ],
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.(eot|svg|ttf)$/,
    loader: 'url-loader?name=static/fonts/**/[name].[ext]'
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "static/images/[name].[ext]"
        }
      }
    ]
  }
]

export default {
  entry: [
    './src/es6/app.js',
    './src/sass/app.scss',
  ],
  output: {
      path: path.resolve(__dirname, 'public'),
      filename: jsOutputPath,
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  devtool: 'source-map',
  watch: true,
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 3000,
  },
  module: {
    loaders
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {from: './static/images/', to: './images/'}
      ]
    ),
    new ExtractTextPlugin(path.resolve(__dirname, `public/${cssOutputPath}`), {
        allChunks: true,
    }),
    ExtractSASS,
  ],
};
