const path = require(`path`);

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index",
    output: {
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [path.join(__dirname, `src`), /@skbkontur/],
                use: `babel-loader`,
            },
            {
                test: /\.css$/,
                include: [path.join(__dirname, `src`), /@skbkontur/],
                use: [
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "public/fonts/[hash].[ext]" },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [`.js`, `.jsx`, `.ts`, `.tsx`],
    },
    devServer: {
        allowedHosts: ["localhost.testkontur.ru"],
        historyApiFallback: true,
    },
};
