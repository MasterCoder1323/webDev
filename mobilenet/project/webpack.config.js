const path = require('path');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');

module.exports = {
	entry: './node_modules/@google-cloud/vision/build/src/index.js',
	target: 'web',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /(fs|require)/,
				loader: 'loader.js',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(fs|require|node_modules)/,
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
			fs: require.resolve('browserify-fs'),
			child_process: require.resolve('cross-spawn'),
			zlib: require.resolve("browserify-zlib"),
		},
		modules: [
			'node_modules',
		],
	},
	externals: [nodeExternals()],
	mode: 'production',

};