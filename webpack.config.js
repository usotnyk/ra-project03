

const PATHS = {
    css: __dirname + "/css",
    js: __dirname + "/app/js",
    build: __dirname + "/build"
};
console.log(__dirname);

module.exports = {
    entry: PATHS.js + "/index.js",
    output: {
        path: PATHS.build,
        filename: "bundle.js"
    },
    module: {
        loaders: [{ 
            test: /\.css$/, 
            loader: "style-loader!css-loader",
            include: PATHS.css 
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: PATHS.js/*  + "/index.js"*/,
            exclude: ['./node_modules/','webpack.config.js']
        }],

    },
    devtool: 'source-map',
    devServer: {
        contentBase: process.cwd(),
        historyApiFallback: true,
        inline: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT
    }
};
