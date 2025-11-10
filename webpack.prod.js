const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "/revisi/",
    filename: "[name].bundle.js",
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: "vendor",
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
  plugins: [
    new CleanWebpackPlugin(),
    new InjectManifest({
      swSrc: path.resolve(__dirname, "sw.js"),
      swDest: "sw.bundle.js",
      exclude: [/\.map$/, /^manifest.*\.js$/, /_error/],
    }),
  ],
});
