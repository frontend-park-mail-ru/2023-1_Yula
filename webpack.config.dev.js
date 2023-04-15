const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        port: 7070,
        hot: true,
        historyApiFallback: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            'assets': path.resolve(__dirname, 'assets'),
        },
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/, // обрабатываем только scss и css файлы
                use: [
                    MiniCssExtractPlugin.loader, // выносим css в отдельный файл
                    'css-loader', // добавляем возможность импорта css в js
                    'sass-loader' // компилируем scss в css
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            { test: /\.handlebars$/, loader: "handlebars-loader" },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/favicon.ico', to: './favicon.ico' },
                { from: './public/manifest.json', to: './manifest.json' },
            ]
        })
    ],
};
