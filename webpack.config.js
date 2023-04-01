const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './public/index.js', // основной js файл приложения
    output: {
        path: path.resolve(__dirname, 'desk'), // путь для сохранения результирующего файла
        filename: 'bundle.js', // имя результирующего файла
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, // обрабатываем только scss и css файлы
                use: [
                    MiniCssExtractPlugin.loader, // выносим css в отдельный файл
                    'css-loader', // добавляем возможность импорта css в js
                    'sass-loader' // компилируем scss в css
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // имя результирующего css файла
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/index.html', to: 'index.html' },
                { from: 'public/handlebars.js', to: 'handlebars.js' },
                { from: 'public/template.js', to: 'template.js' },
                { from: 'public/modules', to: 'modules' },
            ]
        }),
    ],
};
