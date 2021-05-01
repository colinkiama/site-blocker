// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  packageOptions: {
     polyfillNode: true,
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
   optimize: {    
    entrypoints: [
    'views/popup/popup.js',
    'views/background-page/background-script.js'
    ],
    bundle: true,
    minify: true,
    target: 'es2017',
  },
};
