const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: './assets/js/app.js',
  output: {
    filename: `js/app.min.js`,
    path: path.resolve(__dirname, `assets`)
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/global.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "../img",
            emitFile: false,
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          { loader: 'css-loader', options: { importLoaders: 1 } }, //2. Turns css into commonjs
          'postcss-loader',
          "sass-loader" //1. Turns sass into css
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts'
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  }
};

