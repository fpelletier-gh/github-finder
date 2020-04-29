const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV !== "prod";

module.exports = {
  // entry files
  entry: {
    ["bundle"]: "./src/bundle.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  devtool: isDev && "source-map",
  devServer: {
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      // js
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-async-to-generator",
              "@babel/plugin-transform-regenerator",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    // for older webpack extensions interop
    new webpack.LoaderOptionsPlugin({}),
    // html setup (minify for prod)
    new HtmlWebpackPlugin({
      template: "./src/bundle.html",
      minify: !isDev && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: false,
      },
    }),
    // inline js
    new ScriptExtHtmlWebpackPlugin({
      inline: ["bundle.js"],
    }),
    // copy assets to dist
    new CopyWebpackPlugin([{ from: "./src/assets", to: "./" }]),
  ],
};
