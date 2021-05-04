// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  root:"./src",
  packageOptions: {
     polyfillNode: true,
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: "./build"
  },
   optimize: {    
    entrypoints: [
    'src/js/popup.js',
    'src/js/settings.js',
    'src/js/background-script.js'
    ],
    bundle: true,
    minify: true,
    target: 'es2017',
    sourcemap: false
  },
};
