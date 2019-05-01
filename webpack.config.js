const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/index.js' // входной файл
    },
    output: {
        filename: '[name].js', // файл выхода, пишем в квадратных скобках, имя подтягивается с имени входного файла
        path: path.resolve(__dirname, './dist'), // путь от выходного файла
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // регулярка для расширения
                loader: 'babel-loader',// лоадеры срабатывают снизу вверх, последним должен быть для JS
                exclude: '/node_modules/' // исключения для бабел
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true } // объект опций для лоадера
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true } // объект опций для лоадера
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
                    }
                ]
            }]
    },
    devServer: {
        overlay: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
}