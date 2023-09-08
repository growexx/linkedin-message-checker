const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: './src/popup.jsx',
        background: './src/chrome/background.js',
        contentScript: './src/content/index.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/ // Exclude node_modules from watch
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx']
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'public' }]
        })
    ]
};
