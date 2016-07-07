var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: path.join(__dirname, "/dev/development.jsx"),
	output: {
		path: path.join(__dirname, "/dev/"),
		filename: "ruined.js"
	},
	devServer: {
		host: 'localhost',
		port: 8080,
		contentBase: path.join(__dirname, "/dev/"),
		hot: true,
	},
	module: {
		loaders: [
			{ //Babel Loader
				test: /.jsx?$/,
				loader: "babel-loader",
				exclude: /(node_modules)/,
				query: { presets: ["es2015","stage-0","react"] }
			}, { //SASS CSS
				test: /\.s?css$/,
				loader: "style-loader!css-loader!sass-loader"
			}, { //HTML FILE
				test: /\.html?$/,
				loader: "file-loader?name=[name].html"
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: true
		})
	],
	resolve: {
		extensions: ["",".js",".jsx"],
		root: [path.resolve("./src/js"),path.resolve("./src/styles")]
	}
};
