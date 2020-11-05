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
                include: [path.join(__dirname, `src`)],
                use: `babel-loader`,
            },
            {
                test: /\.css$/,
                include: [path.join(__dirname, `src`)],
                use: [
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: {
                                compileType: "module",
                                localIdentName: "[name]__[local]--[hash:base64:5]",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                include: [/@skbkontur[/\\]react-icons/],
                use: [
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: {
                                compileType: "module",
                                localIdentName: "[name]__[local]--[hash:base64:5]",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                include: [/@skbkontur/],
                use: [
                    {
                        loader: "file-loader",
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
