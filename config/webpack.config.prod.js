const path = require('path')
const cssnano = require('cssnano')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const vConsolePlugin = require('vconsole-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = merge(baseConfig, {
	mode: 'production',
	// devtool: 'source-map',
	stats: 'errors-only',
	performance: {
		hints: false // 'error'
	},
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        minimize: true
                    }
                },
                'css-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }]
    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtimechunk~${entrypoint.name}`
        },
        splitChunks: {
			chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    // eslint-disable-next-line no-useless-escape
                    test: /[\\\/]node_modules[\\\/]/,
                    // test: /(vue|vue-router)/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial', // all 可能会导致一些问题
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: cssnano
			}),
			// new UglifyJsPlugin({
            //     sourceMap: true,
            //     uglifyOptions: {
            //         ecma: 6,
            //         cache: true,
            //         parallel: true
            //     }
			// })
			new TerserPlugin({
				sourceMap: true,
				cache: true,
				parallel: true,
				terserOptions: {
					output: {
						comments: false
					}
				}
			})
        ]
    },
    plugins: [
		// eslint-disable-next-line new-cap
		// new vConsolePlugin({
        //     filter: [],
        //     enable: process.env.NODE_ENV === 'lan'
        // }),
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(process.cwd(), '.'),
			verbose: false,
			dry: false
		}),
		new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
		}),
        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), '.', 'static'),
            to: path.join(process.cwd(), '.', 'dist', 'static'),
            toType: 'dir',
            ignore: [
                '.DS_Store',
                '.gitkeep',
                'template.html'
            ]
		}])
		// new HardSourceWebpackPlugin()
    ]
})
