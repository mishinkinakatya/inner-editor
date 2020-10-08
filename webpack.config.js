const path = require(`path`)

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.join(__dirname, `src`),
                use: `babel-loader`
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, `src`),
                use: [`style-loader`, `css-loader`]
            }
        ]
    },
    resolve: {
        extensions: [`.js`, `.jsx`, `.ts`, `.tsx`]
    }
};
