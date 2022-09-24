const path = require("path");
const { merge } = require("webpack-merge");

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};

const productionConfig = {
  mode: "production",
};

const developmentConfig = {
  watch: true,
  mode: "development",
  devtool: "source-map",
};

const mainConfig = merge(commonConfig, {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/assets"),
    clean: true,
  },
});

module.exports = (env, argv) =>
  argv.mode === "development"
    ? merge(mainConfig, developmentConfig)
    : merge(mainConfig, productionConfig);
