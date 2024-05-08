const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  viewportHeight: 800,
  viewportWidth: 800,
  videoCompression: false,
  // experimentalSessionAndOrigin: false,
  e2e: {
    // testIsolation: true,
    setupNodeEvents(on, config) {},
    // baseUrl: "https://widget.mticket.com.ua",
    // prod: {
    //   baseUrl: "https://widget.mticket.com.ua"
    // },
  },
  env: {
           MAILOSAUR_API_KEY: "2i6TdSUYtF6sMWam0nEH0IuOBFyyLoWZ",
          prod: {
            baseUrl: "https://widget.mticket.com.ua"
          },
  }

});