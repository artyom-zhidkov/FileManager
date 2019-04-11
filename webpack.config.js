const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");

console.log("HI");

module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css", ".vue", ".json"],
        alias: {
          vue$: "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.(s*)css$/,
            use: [
              "vue-style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  data: '$main-color: #db4019;'
                }
              }
            ]
          },
          {
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
              loaders: {
                scss: "vue-style-loader!css-loader!sass-loader",
                sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
              },
              esModule: true
            }
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: "file-loader"
          }
        ]
    },
    entry: {"main": "./src/main.js"},
    mode: "development",
    plugins: [
      new VueLoaderPlugin()
    ]
}