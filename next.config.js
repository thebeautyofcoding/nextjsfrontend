const Dotenv = require("dotenv-webpack");


module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add the new plugin to the existing webpack plugins
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    },

        env: {
        PRODUCTION: true,
        APP_NAME: "justPractice",
        DOMAIN_PRODUCTION: "https://nextjsfrontend2.vercel.app",
        API_PRODUCTION: "https://justpractice123.herokuapp.com/api",
       
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID

    }
}




