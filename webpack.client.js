const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // extract css into separate files
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // minify css
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); // clean previous bundle files
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',

	// Tell webpack the root file of our
	// server application
	entry: [ 
            './src/js/index.js', './src/stylesheets/main.css'
        ],

	// Tell webpack where to put the output file
	// that is generated
	output: {
		filename: '[name].[contentHash].bundle.js',
		path: path.resolve(__dirname, 'public')
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: [ 'html-loader' ]
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						outputPath: 'imgs'
					}
				}
			},
                        {
                            test: /\.ejs$/,
                            loader: 'ejs-loader',
                            options: {
                                variable: 'data',
                                interpolate : '\\{\\{(.+?)\\}\\}',
                                evaluate : '\\[\\[(.+?)\\]\\]'
                            }
                        },
                        {
                        	test: /\.css$/,
                        	use: [
                        		MiniCssExtractPlugin.loader, //3. Extract css into files
                        		'css-loader' //2. Turns css into commonjs
                        	]
                        }
		]
	},

	optimization: {
		minimizer: [ new OptimizeCssAssetsPlugin(), new TerserPlugin(),
                             new HtmlWebpackPlugin({
                               template: "./src/views/landing.ejs",
                               minify: {
                                 removeAttributeQuotes: true,
                                 collapseWhitespace: true,
                                 removeComments: true
                               }
                             })
                ]
	},

	plugins: [ new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
                   new CleanWebpackPlugin()
                   ]
};
