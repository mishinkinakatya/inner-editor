const path = require(`path`);

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: config => {
    config.module.rules = config.module.rules.filter(
        f => f.test.toString() !== '/\.css$/'
    );

    config.module.rules.push({
      test: /\.css$/,
      include: path.join(__dirname, `src`),
      use: [
        `style-loader`,
        {
          loader: `css-loader`,
          options: {
            modules: true,
          },
        },
      ]
    });

    return config;
   }
}