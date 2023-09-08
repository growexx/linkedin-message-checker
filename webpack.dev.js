const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');

module.exports = merge(config, {
    mode: 'production',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // Output folder path
        port: 3000, // Choose a port for the development server
        hot: true // Enable Hot Module Replacement (HMR)
    }
});
