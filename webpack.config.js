const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    alwaysWriteToDisk: true,
    template: path.resolve(__dirname, './src/index.html'),
    filename: 'index.html'
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "styles.css",
});
const htmlWebpackHarddiskPlugin = new HtmlWebpackHarddiskPlugin(
    /*{
    	outputPath: path.resolve(__dirname, './dist')
    }*/
);

// const autoprefixerPlugin = new webpack.LoaderOptionsPlugin({
//     options: {
//         postcss: [autoprefixer()]
//     }
// });

module.exports = {
    mode: 'none',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'index.js'
    },
    devtool: "inline-source-map", // any "source-map"-like devtool is possible
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }, {
                test: /\.html/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|mp4|webm)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/',
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '',
                        publicPath: '',
                    }
                }]
            },
            // {
            //     test: /\.(mp4|webm)$/i,
            //     use: [
            //       {
            //         loader: 'url-loader',
            //         // options: {
            //         //   limit: 8192
            //         // }
            //       }
            //     ]
            //   },
            {
                test: /\.(sc|c)ss$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader",
                    {
                        loader: 'sass-loader',
                        //     options: {
                        //         sourceMap: true,
                        //         sourceMapContents: false
                        //     }
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlWebPackPlugin,
        miniCssExtractPlugin,
        // autoprefixerPlugin,
        htmlWebpackHarddiskPlugin,
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "bundle"),
        hot: true,
        watchContentBase: true,
        inline: true,
        publicPath: '',
        port: 8008,
    }
    // devServer: {
    // 	contentBase: path.join(__dirname, "bundle"),
    // 	// compress: true,
    // 	watchContentBase: true,
    // 	stats: "errors-only",
    // 	hot: true,
    // 	inline: true,
    // 	// open: true
    // },
};