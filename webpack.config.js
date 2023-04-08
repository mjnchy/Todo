const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [
		  {
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		  },
		],
	  },

	  devtool: 'eval',
	
	devServer: {
		static: './dist',
		open: {
			app: {
				name: 'google-chrome-stable',
			}
		}
	},
};
