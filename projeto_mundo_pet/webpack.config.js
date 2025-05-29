const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  target: "web", 
  mode: "development",

  // Arquivo inicial que o Webpack vai processar
  entry: path.resolve(__dirname, "src", "index.js"), 

  // Arquivo final gerado após o bundle
  output: {
    filename: "main.js",

    // Pasta onde o arquivo final será salvo
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    // Define a pasta de onde os arquivos estáticos serão servidos
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  plugins: [
    // Gera arquivo HTML com o bundle e define favicon
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: path.resolve("src", "assets", "dogicon.ico"),
    }),

    // Copia a pasta 'assets' de src para dist
    new CopyWebpackPlugin ({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "dist", "src", "assets")
        }
      ]
    })
  ], 

  module: {
    rules: [
      {
        // Converte CSS para JS e injeta no HTML
        test: /\.css$/,
        use: ["style-loader", "css-loader"], 
      },
      {
        // Converte JS moderno para versão compatível ignorando node_modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
} 