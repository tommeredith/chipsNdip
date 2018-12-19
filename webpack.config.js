const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    inject: "body"
});

module.exports = {

    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
            { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ }
        ]
    },
    node: {
        console: true,
        fs: "empty",
        net: "empty",
        tls: "empty"
    },

    plugins: [HtmlWebpackPluginConfig]
};
