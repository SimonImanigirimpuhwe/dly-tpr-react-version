const Dotenv = require('dotenv-webpack')
const path = require('path');
const hmtlWebpackPlugin = require('html-webpack-plugin');

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
            '@material-ui/core': '@material-ui/core/esm'
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
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
        new Dotenv({
            path: "./.env",
            safe: true,
            systemvars: true,
            silent: true,
            defaults: false,
          }),
          new Dotenv(),
    ]
}