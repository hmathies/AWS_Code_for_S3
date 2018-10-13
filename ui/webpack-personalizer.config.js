const path = require('path')
const webpack = require('webpack')

const nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:443',
        'webpack/hot/dev-server',
        './ui/index-personalizer.jsx'
    ],
    output: {
        path: path.resolve(__dirname, 'build-personalizer'),
        filename: 'app.js',
        publicPath: '/assets/'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    compact: true,
                    retainLines: true,
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    devServer: {
        port: 443,
        host: '0.0.0.0',
        compress: true,
        inline: false
    },
    externals: {
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            config: path.join(__dirname, `config-${nodeEnv}.js`)
        }
    }
}
