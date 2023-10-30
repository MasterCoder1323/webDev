// my-loader.js
module.exports = function (module) {
	// Replace the fs module with a function that imports the fs module at runtime
	module.source = module.source.replace(/(fs\.)/g, `(await import('browserify-fs')).`);

	// Replace the require function with a function that imports the require function at runtime
	module.source = module.source.replace(/(require\(')([^']+)('\))/g, `(await import('require')).$2`);

	return module;
};
