const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	resolve: {
		fallback: {
			stream: require.resolve('stream-browserify'),
			buffer: require.resolve("buffer"),
			crypto: require.resolve("crypto-browserify"),
			assert: require.resolve("assert"),
			path: require.resolve("path-browserify"),
			querystring: require.resolve("querystring-es3"),
			os: require.resolve("os-browserify"),
			url: require.resolve("url"),
			https: require.resolve("https-browserify"),
			http: require.resolve("stream-http"),
			zlib: require.resolve("browserify-zlib"),
		},
		modules: [
			'node_modules',
		],
	},
	externals: {
		fs: 'fs',
		child_process: 'child_process',
	},
};