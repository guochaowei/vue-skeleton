const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); 
module.exports = {
    target: 'node', //构建目标
    entry: {
        skeleton: './src/skeleton.entry.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/', //在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址
        filename: '[name].js',
        libraryTarget: 'commonjs2', //配置以何种方式导出库
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    externals: nodeExternals({
        whitelist: /\.css$/,
    }),
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    plugins: [
        // 用于Vue单文件组件的webpack加载程序
        new VueLoaderPlugin(),
        // 该软件包为Vue 2.0提供Node.js服务器端呈现
        new VueSSRServerPlugin({
            filename: 'skeleton.json',
        }),
    ],
};
