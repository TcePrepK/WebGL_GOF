const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    target: "electron-main",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            path: false,
        },
    },
    output: {
        publicPath: "http://localhost:3005",
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    node: {
        global: true,
        __dirname: true,
        __filename: true,
    },
};
