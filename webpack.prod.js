const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "berhasil/",
    clean: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendors",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          priority: 20,
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
});
