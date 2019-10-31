const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
const EslintFriendlyFormatter = require('eslint-friendly-formatter')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { publicPath } = require('./utils')

module.exports = {
	entry: {
        index: './src/views/integral-mall/main.ts'
    },
	output: {
		publicPath,
		path: path.resolve(process.cwd(), 'dist'),
        filename: 'js/[name].[hash:7].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
            '@utils': path.join(process.cwd(), 'src/assets/ts/utils'),
            '@packages': path.join(process.cwd(), 'src/packages'),
            '@directives': path.join(process.cwd(), 'src/directives'),
            '@filters': path.join(process.cwd(), 'src/filters'),
            // vue: 'vue/dist/vue.js',
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
			test: /\.(js)$/,
			use: [{
				loader: 'eslint-loader',
				options: {
					formatter: EslintFriendlyFormatter
				}
			}, {
				loader: 'thread-loader',
				options: {
					workers: require('os').cpus().length
				}
			}, {
				loader: 'babel-loader'
			}],
			// loader: 'eslint-loader',
            // enforce: 'pre',
			include: [path.resolve(process.cwd(), 'src')],
			exclude: [path.join(process.cwd(), 'node_modules')]
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: { /* ... */ }
		}, {
			test: /\.(ts)?$/,
			// enforce: 'pre',
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			}, {
				loader: path.join(__dirname, 'pre-tslint-loader.js')
			}, {
				loader: 'thread-loader',
				options: {
					workers: require('os').cpus().length
				}
			}]
		}, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: path.posix.join('./', 'img/[name].[hash].[ext]')
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 75
                    },
                    optipng: {
                        enabled: false
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false
                    }
                }
            }]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('./', 'media/[name].[hash].[ext]')
                }
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
					name: path.posix.join('./', 'fonts/[name].[hash].[ext]')
                }
            }
        }]
	},
	plugins: [
        new VueLoaderPlugin(),
        // new PreloadWebpackPlugin({
        //     // rel: 'prefetch',
        //     rel: 'preload',
        //     include: 'initial'
		// })
		new HtmlWebpackPlugin({
			// inlineSource: '.css$',
			title: '',
			template: path.join(process.cwd(), './static/template.html'),
			filename: `index.html`,
			// chunks: [`runtimechunk`, 'chunk-vendors'],
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
		})
    ]
}
