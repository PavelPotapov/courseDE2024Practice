import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, "./src");
const buildDir = path.resolve(__dirname, "./build");
const publicDir = path.resolve(__dirname, "./public");
const pagesDir = path.resolve(__dirname, "./src/pages");
const appDir = path.resolve(__dirname, "./src/app");

export default async (env, { mode }) => {
  const isDev = mode === "development";
  return {
    mode,
    entry: path.join(appDir, "app.js"),
    output: {
      path: buildDir,
      filename: "js/[name].js",
      clean: true,
    },
    devServer: {
      static: {
        directory: publicDir,
      },
      port: 8888,
      open: true,
      historyApiFallback: true,
      hot: true,
      watchFiles: [
        "src/**/*.js",
        "src/**/*.css",
        "src/**/*.html",
        "src/**/*.json",
      ],
    },
    module: {
      rules: [
        {
          test: /\.pcss$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: isDev ? true : false,
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      // формируем html при билде
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(pagesDir, "index.js"),
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name][hash].css",
      }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(env.API_URL),
      }),
    ],
    resolve: {
      alias: {
        "#shared": path.resolve(__dirname, "src/shared"),
        "#entities": path.resolve(__dirname, "src/entities"),
        "#features": path.resolve(__dirname, "src/features"),
        "#pages": path.resolve(__dirname, "src/pages"),
        "#widgets": path.resolve(__dirname, "src/widgets"),
        "#app": path.resolve(__dirname, "src/app"),
      },
      extensions: [".js", ".pcss"],
    },
    devtool: isDev ? "source-map" : false,
  };
};
