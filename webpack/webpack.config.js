const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, '../dist') ,
        filename : 'js/bundle.js'
    },

    // devtool: 'source-map',
    devServer: {
        contentBase: __dirname + '../dist',
        port: '5000',
        open: true
    },
    // Modulos
    module: {
        rules: [
            // PUG
            { 
                test: /\.pug$/,
                use: ['pug-loader']
            },

            // CSS
            {
                // test: /\.scss$/,
                test: /\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },

            // Image
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/img/',
                            useRelativePath: true
                        }
                    },
                    
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                  
                ]
            } 
        ]
    },
    // Plugin
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // Home
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title: 'Home',
            hash: true,
            filename: 'index.html',
            template: '!!pug-loader!./src/index.pug'
        
        }),
        // About
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title: 'Services',
            hash: true,
            filename: 'services.html',
            template: '!!pug-loader!./src/services.pug'
        }),
        // Contact US
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title: 'Contact US',
            hash: true,
            filename: 'contact.html',
            template: '!!pug-loader!./src/contact.pug'
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, '../dist')
            }
        ),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-styles.css'
        })
        
    ]
}