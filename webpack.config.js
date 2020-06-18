const path = require('path'); //调用node.js中的路径
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js' //需要打包的文件
    },
    output: {
        filename: '[name].[chunkhash:8].js', //输入的文件名是什么，生成的文件名也是什么
        path: path.resolve(__dirname, './dist') //指定生成的文件目录
    },
    mode: "development", //开发模式，没有对js等文件压缩，默认生成的是压缩文件
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/test.html'
        })
    ],
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // if hmr does not work, this is a forceful method.
                        reloadAll: true,
                    },
                },
                'css-loader',
            ],
        }, ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        open: true, // 自动打开浏览器
        port: 9000,
        host: '127.0.0.1'
    }
}