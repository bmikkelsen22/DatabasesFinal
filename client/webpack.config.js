const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
    group: "./src/group/group-page.tsx",
    header: "./src/header/header-only.tsx"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public", "out"),
    libraryTarget: "var",
    library: "ExpenseTracker"
  }
};
