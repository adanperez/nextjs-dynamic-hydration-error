# next/dynamic from external package causes hydration errors

This repo demonstrates an issue we are seeing with the following setup:
- Pages Router with App Router
- Hydration Error when using an external package's dynamic import component

## Issue

- `pnpm run build`
- `pnpm run start`
- Go to http://localhost:3000 and refresh the page a couple times 

You will see the following Hydration errors in the console.
  ```
  framework-5e252d5045bb7a0e.js:9 Uncaught Error: Minified React error #418; visit https://reactjs.org/docs/error-decoder.html?invariant=418 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
    at ly (framework-5e252d5045bb7a0e.js:9:46791)
    at framework-5e252d5045bb7a0e.js:9:99911
    at oD (framework-5e252d5045bb7a0e.js:9:106131)
    at oO (framework-5e252d5045bb7a0e.js:9:99079)
    at framework-5e252d5045bb7a0e.js:9:98886
    at oF (framework-5e252d5045bb7a0e.js:9:98893)
    at oS (framework-5e252d5045bb7a0e.js:9:93932)
    at x (framework-5e252d5045bb7a0e.js:33:1364)
    at MessagePort.T (framework-5e252d5045bb7a0e.js:33:1894)

  framework-5e252d5045bb7a0e.js:9 Uncaught Error: Minified React error #423; visit https://reactjs.org/docs/error-decoder.html?invariant=423 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
    at i (framework-5e252d5045bb7a0e.js:9:120721)
    at oO (framework-5e252d5045bb7a0e.js:9:99019)
    at framework-5e252d5045bb7a0e.js:9:98886
    at oF (framework-5e252d5045bb7a0e.js:9:98893)
    at ox (framework-5e252d5045bb7a0e.js:9:95645)
    at oS (framework-5e252d5045bb7a0e.js:9:94200)
    at x (framework-5e252d5045bb7a0e.js:33:1364)
    at MessagePort.T (framework-5e252d5045bb7a0e.js:33:1894)
  ```

If you remove the `app` directory and rebuild and start the app, you will no longer see hydration errors.
The combination of `pages` and `app` directories causes the hydration error.