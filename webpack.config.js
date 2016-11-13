var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer"); // For bundling the CSS styles if people want it
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // For getting the CSS styles bundled up

module.exports = {
	entry: path.join(__dirname, "/src/index.jsx"),
	output: {
		path: path.join(__dirname, "/build/"),
		filename: "ruined.js"
	},
	externals: {
		"react": "react",
		"react-dom": "react-dom"
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'source-map'
			}
		],
		loaders: [
			{ //Babel Loader
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /(node_modules)/,
				query: { presets: ["es2015","stage-0","react"] }
			}, { //SASS CSS
				test: /\.s?css$/,
				loader: "style-loader!css-loader!postcss-loader!sass-loader"
			}, { //HTML FILE
				test: /\.html?$/,
				loader: "file-loader?name=[name].html"
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: false
		}),
		new ExtractTextPlugin("ruined.css", { allChunks: true }),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
				screw_ie8: true
			},
			comments: false,
			sourceMap: false,
			mangle: true
		})
	],
	postcss: function() { return [autoprefixer] },
	resolve: {
		extensions: ["",".js",".jsx"],
		root: [ path.resolve( "./src/") ],
		modules: [ "node_modules", path.resolve( "./src/") ]
	}
};
