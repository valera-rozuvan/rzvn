# home-page

home page for RZVN portal

## Installing

First clone the root `rzvn` repo somewhere:

```shell
git clone https://github.com/valera-rozuvan/rzvn.git
```

Then switch to the `home-page` sub-folder, and install dependencies:

```shell
cd /home/user/path/to/rzvn/home-page
npm install
```

## Running

Several NPM commands are included for running, building, and doing other maintenance tasks.

### Local development

Launch a dev server with auto reloading, and source maps for debugging:

```shell
npm run start
```

You can now open [localhost:3000](http://localhost:3000/) in your browser, and observe the live application.

If you want to change the default port `3000`, add the line:

```text
PORT=8001
```

to the end of `.env` file. Replace `8001` with the desired port number.

### Generating a build for debugging

Create a build for debugging purposes (source maps will be included, NO live reload):

```shell
npm run build:local
```

This will generate a `build` folder, which is suitable to be used with a 3rd party static file server. Use for testing purposes only!

### Production build

Create a minified production build (NO source maps, NO live reload):

```shell
npm run build
```

This will generate a `build` folder. Use any static file server to host your production front-end app.

### Linting

This project uses [ESLint](https://eslint.org/) to enforce code style and catch simple syntax errors while coding. The following NPM commands are provided:

```shell
npm run lint # checks all files using settings from `.eslintrc.js` config
npm run lint:fix # To automatically fix some errors.
```

## dotenv

Out of the box, this project supports a `.env` configuration file. Environment variables from this file are sourced using [dotenv](https://www.npmjs.com/package/dotenv) NPM package. This happens when Webpack is performing a build. Variable names which have a prefix `REACT_APP_` will be available at runtime in the React app via the global object `process.env`. When you run this project, you can open the browser's JavaScript console, and observe the following:

If you put in the file `.env` the following:

```text
REACT_APP_BASE_URL=https://example.com
REACT_APP_API_URL=https://api.example.com
```

then in the application you can do:

```javascript
console.log(process.env.REACT_APP_BASE_URL); // 'https://example.com'
console.log(process.env.REACT_APP_API_URL); // 'https://api.example.com'
```

**NOTE**: The `dotenv` NPM package is used only at build time. It is not included in the resulting build.

## License

Licensed under MIT. See [LICENSE](LICENSE) for more details.
