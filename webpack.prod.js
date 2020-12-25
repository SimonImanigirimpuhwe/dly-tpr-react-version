require('dotenv').config();
const path = require('path');
const hmtlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules:[__dirname, "src", "node_modules"],
        alias: {
            '@material-ui/core': '@material-ui/core/es'
          },
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader:'html-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|mp3|svg)$/,
                loader: 'file-loader'
            }
        ],      
    },
    devServer: {
        hot: true,
        historyApiFallback: {
            disableDotRule: true
        },
        port: 5000,
        contentBase: './public'
    },
    plugins: [
        new hmtlWebpackPlugin({
            template: './src/index.html',
            baseUrl: "/"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                REACT_APP_BACKEND_URL: JSON.stringify(
                    process.env.REACT_APP_BACKEND_URL
                )
            }
        })
    ]
}