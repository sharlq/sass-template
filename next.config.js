/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  /*
        this is to solve the 
        Module build failed: UnhandledSchemeError: Reading from "node:stream" is not handled by plugins (Unhandled scheme).
        Webpack supports "data:" and "file:" URIs by default.
        You may need an additional plugin to handle "node:" URIs
    */
  //   webpack: (config, { webpack }) => {
  //     config.plugins.push(
  //       new webpack.IgnorePlugin({
  //         resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
  //       }),
  //     );
  //     return config;
  //   },
};

export default config;
