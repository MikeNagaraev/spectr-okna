import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const appPath = path.resolve(__dirname, 'src');
const nodePath = path.resolve(__dirname, 'node_modules');
const scriptsPath = path.resolve(appPath, 'scripts');
const stylesPath = path.resolve(appPath, 'styles');

const distPath = path.resolve(__dirname, 'dist');

const scriptsRoot = path.resolve(scriptsPath, 'app.js');
const stylesRoot = path.resolve(stylesPath, 'app.scss');

const loaders = [
    {
        test: /\.js$/,
        exclude: [nodePath],
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    }, {
        test: /\.(sass|scss)$/,
        exclude: [nodePath],
        include: [
            stylesPath
        ],
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "sass-loader"
                }
            ],
            fallback: "style-loader"
        })
    }, {
        test: /\.css$/,
        exclude: [nodePath],
        include: [
            stylesPath
        ],
        use: ['style-loader', 'css-loader']
    }, {
        test: /\.(eot|svg|ttf)$/,
        loader: 'url-loader?name=static/fonts/**/[name].[ext]'
    }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?name=static/images/[name].[ext]'
    }, {
        test: /\.json$/,
        loader: 'json-loader'
    }
];

const plugins = [
    new HtmlWebpackPlugin({
        template: 'index.html',
        inject: 'body'
    }),
    new CopyWebpackPlugin([
        {
            from: './static/images/',
            to: './images/'
        }, {
            from: './index.html',
            to: 'index.html'
        }, {
            from: './font-awesome',
            to: './font-awesome'
        }
    ]),
    new ExtractTextPlugin('css/app.min.css')
];

export default function(env) {
    const config = {
        entry: [
            scriptsRoot, stylesRoot
        ],
        output: {
            path: distPath,
            filename: 'js/app.js'
        },
        resolve: {
            extensions: ['.js', '.scss', '.css']
        },
        watch: true,
        devtool: 'source-map',
        devServer: {
            contentBase: distPath, // for heroku
            compress: true,
            port: 3000
        },
        module: {
            loaders
        },
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        plugins: plugins
    };
    return config;
};
