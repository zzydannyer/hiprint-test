// vue.config.js
const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        // url: require.resolve("url/"),
        // crypto: require.resolve("crypto-browserify"),
        // fs: false,
        // path: require.resolve("path-browserify"),
        // util: require.resolve("util/"),
        // stream: require.resolve("stream-browserify"),
        // http: require.resolve("stream-http"),
        // https: require.resolve("https-browserify"),
        // zlib: require.resolve("browserify-zlib"),
        // assert: require.resolve("assert/"),
        // buffer: require.resolve("buffer/"),
        // encoding: require.resolve("encoding"),
        // process: require.resolve("process/browser"),
        // constants: require.resolve("constants-browserify"),
        // "readable-stream/transform": require.resolve(
        //   "readable-stream/lib/_stream_transform.js"
        // ),
        // "readable-stream/passthrough": require.resolve(
        //   "readable-stream/lib/_stream_passthrough.js"
        // ),
      },
    },
  },
  chainWebpack: (config) => {
    // config.plugin("provide").use(webpack.ProvidePlugin, [
    //   {
    //     Buffer: ["buffer", "Buffer"],
    //     process: "process/browser",
    //   },
    // ]);
  },
};
