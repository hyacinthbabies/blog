const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const __DEV__ = process.env.NODE_ENV === 'dev'; //发布环境
const plugins = [
    new OpenBrowserPlugin({ url: 'http://127.0.0.1:8080', browser: 'Google Chrome' }),
    new webpack.HotModuleReplacementPlugin()
];
//开发环境不压缩文件
// if (!__DEV__) {
//     //压缩文件
//     plugins.push(new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false
//         }
//     }));
// }
module.exports = {
    entry: {
        // main: './main.js',
        entry: './admin/entry.js'
    },
    output: {
        //publicPath是webpack-dev-server构建文件输出的位置
        publicPath: '/admin/build/',
        // path是webpack构建文件放置的位置
        path: path.resolve(__dirname, './admin/build/'),
        filename: '[name].js'
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: "style!css" },
            // { test: /\.jsx$/, loader: ' jsx-loader', exclude: /node_modules/ },
            { test: /\.js?$/, loader: 'babel-loader', query: { presets: ['es2015'] }, exclude: /node_modules/ }
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: __dirname,
        port: 8080,
        stats: {
            colors: true
        },
        hot: true,
        proxy: [{
            context: ["/file", "/api"],
            target: "http://127.0.0.1:3000",
        }]
    },
};
