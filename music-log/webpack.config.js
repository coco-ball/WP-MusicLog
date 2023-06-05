const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin =
// require("webpack-bundle-analyzer").BundleAnalyzerPlagin;

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "./pages/index.js"),
    target: "node",
    node: {
      fs: "empty",
      net: "empty",
    },
  },
};
