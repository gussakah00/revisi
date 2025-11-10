const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
<<<<<<< HEAD
=======
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
>>>>>>> 4f29ea4e0f48b8aace6dd97052bd666d42af8f0f

module.exports = merge(common, {
  mode: "production",
  output: {
<<<<<<< HEAD
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/revisi/",
    clean: true,
=======
    publicPath: "/revisi/",
    filename: "[name].bundle.js",
>>>>>>> 4f29ea4e0f48b8aace6dd97052bd666d42af8f0f
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
<<<<<<< HEAD
        vendor: {
          name: "vendors",
=======
        default: false,
        vendors: false,
        vendor: {
          name: "vendor",
>>>>>>> 4f29ea4e0f48b8aace6dd97052bd666d42af8f0f
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
<<<<<<< HEAD
=======
  plugins: [
    new CleanWebpackPlugin(),
    new InjectManifest({
      swSrc: path.resolve(__dirname, "sw.js"),
      swDest: "sw.bundle.js",
      exclude: [/\.map$/, /^manifest.*\.js$/, /_error/],
    }),
  ],
>>>>>>> 4f29ea4e0f48b8aace6dd97052bd666d42af8f0f
});
