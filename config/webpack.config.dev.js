const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host: '0.0.0.0',
		compress: true,
		port: 2020,
		hot: true,
		open: false,
		clientLogLevel: 'none',
		noInfo: true,
		proxy: {
			'/api/v3': {
                target: 'http://11.22.33.111:8891',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader'
			]
		}, {
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsWebpackPlugin()
	]
})
