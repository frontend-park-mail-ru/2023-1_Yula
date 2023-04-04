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
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            'assets': path.resolve(__dirname, 'assets'),
        },
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
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/fonts/[name][ext]'
                }
              }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // имя результирующего css файла
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         // { from: 'public/index.html', to: 'index.html' },
        //         { from: 'src/modules', to: 'modules' },
        //     ]
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
    ],
};
