const modoDev = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CSSMinimizerWebpack = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: modoDev ? "development" : "production",
    entry: "./src/index.js",
    devServer: {
        static: {
            directory: "./build",
        },
        port: 9000,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new CSSMinimizerWebpack({}),
        ],
    },
    devtool: "source-map",
    output: {
        filename: "app.js",
        path: __dirname + "/build",
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "estilo.css" }),
        new CopyWebpackPlugin({
            patterns: [
                { context: 'src/', from: '**/*.html' },
                { context: 'src/', from: 'imgs/**/*' }
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
                    "css-loader", // interpreta @import, url()...
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)$/,
                use: ["file-loader"],
            },
        ],
    },
};
