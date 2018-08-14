/**
 * Created by wanganyu on 2018/3/13.
 */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
// const extractTextPlugin = require('extract-text-webpack-plugin')

// const extractTextPluginScss = new extractTextPlugin(`scss.css`)
// const extractTextPluginCss = new extractTextPlugin(`css.css`)

console.log(__dirname)
module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
                // options: {
                //     loaders: {
                //         scss: extractTextPluginScss.extract({
                //             use: ['css-loader', 'sass-loader'],
                //             fallback: 'vue-style-loader'
                //         }),
                //         css: extractTextPluginCss.extract({
                //             use: 'css-loader',
                //             fallback: 'vue-style-loader'
                //         })
                //     }
                // }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                // exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.css/,
                // exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        //让前后端http请求都转到node的3000端口，而不是前端的8080端口
        proxy: {
            '/': {
                target: 'http://localhost:3000/'
            }
        }
    }
}