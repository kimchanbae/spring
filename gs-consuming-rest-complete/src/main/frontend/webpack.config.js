const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
  },
  
  devServer: {
	/*contentBase: path.join(__dirname, "dist"),
	publicPath: "/",*/
	/*overlay: true,*/
	/*host: "0.0.0.0",*/
	port: 3000,
	historyApiFallback: true,
    liveReload: true,
	/*proxy: {
        "**": "http://localhost:9000"
    }*/
  },
  
  module: {
    rules: [
      	{
        	test: /\.(js|jsx)$/,
        	exclude: /node_modules/,
        	use: {
          		loader: "babel-loader",
        	},
      	},
      	{
        	test: /\.css$/,
        	use: ["style-loader", "css-loader"],
      	},
	  	{
      		test: /\.svg$/,
		},
    ],
  },
  
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};