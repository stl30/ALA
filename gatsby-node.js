/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.modifyWebpackConfig = ({ config, stage }) => {
    config.plugin("webpack-define", webpack.DefinePlugin, [{ "global.GENTLY": false }])

    return config;
};