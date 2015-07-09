module.exports = {
    entry: './app/app.js',
    output: {
        path: './public/js', // This is where images AND js will go
        // publicPath: 'http://mycdn.com/', // This is used to generate URLs to e.g. images
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'jsx-loader?harmony' }, // loaders can take parameters as a querystring
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.js')
        extensions: ['', '.js', '.json']
    }
};