> ### This project was bootstrapped with [Vite](https://vitejs.dev/).

# DomoApps Advanced App Platform Template

## Overview

Vite Template optimized for building advanced DomoApps.

* [Usage](#usage)
* [Running project (local dev)](#running-project-local-dev)
* [Building and uploading](#building-and-uploading)
* [Login and proxy](#login-and-proxy)
  + [Login](#login)
  + [Dev-server proxy](#dev-server-proxy)
* [Available Scripts](#available-scripts)
  + [`pnpm generate`](#pnpm-generate)
      - [*Components*](#components)
      - [*Reducers*](#reducers)
  + [`pnpm start`](#pnpm-start)
  + [`pnpm test`](#pnpm-test)
  + [`pnpm build`](#pnpm-build)
  + [`pnpm storybook`](#pnpm-storybook)
* [git hooks](#git-hooks)
* [Additional notes](#additional-notes)

## Usage

The easiest way to use this template is to run the `da` cli command found in [@domoinc/da](https://www.npmjs.com/package/@domoinc/da). Please follow the installation instructions there and use the `da new my-app-name` command to create a new project.

* Note: you can also manually clone this repository, or use a tool like [degit](https://www.npmjs.com/package/degit) to scaffold a project using this template. _However_, you would have to manually replace the placeholders in the template (e.g. app name, package manager, etc).

## Running project (local dev)

Once your template is set up and ready, use the `start` script to run the local server. e.g:

`pnpm start`

By default, the build tool will attempt to run the server on port 3000, 3001, or 3002 (in that order). If all these ports are busy, a random available port will be used.

## Building and uploading

The project can be built using the `build` script. But an `upload` script is also provided, which will prepare and build the project, and upload it to your Domo instance.

* Note: make sure to [log into](#login-and-proxy) your Domo instance before attempting to upload your project.

## Login and proxy

In order to send requests to your Domo instance from within your app while running a local server, or to upload your project to your instance, you must first log into it.


### Login

Use the ["ryuu" cli](https://www.npmjs.com/package/ryuu) to login to your Domo instance: `domo login`.

### Dev-server proxy

Before using endpoints in your instance, you must login and upload your project at least once. This is required to obtain a proxy id to provide to the local server's proxy. Follow these steps:

1. [Log into](#login) your instance
2. Upload your base app to your Domo instance using the `upload` script (e.g. `pnpm upload`). The project will build, add all assets to the `build` folder, and then upload those assets to Domo.
3. The `manifest.json` file in the `build` folder will be modified by the domoapps cli to include an `id` property. You will want to copy this `id` into the manifest in your `public` folder so that it doesn't continue to create a new `id` (and therefore, a new asset) on each upload. This is your new asset's id.
4. On your Domo instance, navigate to your Asset Library, locate the newly create asset, and create a new card for it.
5. Back in your project, add a `proxyId` property to the `manifest.json` file in your `public` folder (or `src/manifestOverrides`) using the id of the newly created card. See [this documentation](https://www.npmjs.com/package/@domoinc/ryuu-proxy#user-content-getting-a-proxyid-advanced) for more information on obtaining the proxy id.

## Available Scripts

The following scripts are provided in the base template. The examples in this section use `pnpm`, but you can use your favorite package manager to run them (e.g. `pnpm`, `npm run`, `yarn`)

### `pnpm generate`

The command `pnpm generate` will generate a new component or reducer slice, and add it to your project (or the [`da` cli]([@domoinc/da](https://www.npmjs.com/package/@domoinc/da#da-generate-template)), if installed globally)

#### *Components*

The new component will be added in the `src/components` folder. The storybook and test files (if selected) will be included in the same folder.

#### *Reducers*

Generating a slice will produce the following modifications to your project:

1. A new folder will be created in the `/src/reducers` directory of your project and a `slice.ts` file will be added to it with some boiler plate examples for actions and selectors using Redux Toolkit.
More info can be found in the Redux Toolkit [documentation](https://redux-toolkit.js.org/api/createSlice).
2. The `index.ts` file in the base of the reducer folder will be modified to import your new slice and wire it up.
_As long as you always create slices using the generator command, you should never need to touch this file._

### `pnpm start`

Runs the app in the development mode.
Open [localhost:3000](http://localhost:3000) to view it in the browser.

The page will hot reload as you make edits and save files.
Linting errors will be logged in the console.

### `pnpm build`

Builds the app for production to the `build` folder.

Prettier is used in the project to auto-format your code, and eslint is used to maintain code rules. Both scripts are run before every build, along with any unit tests present.

### `pnpm test`

Launches the test runner in watch mode.
See the section about [writing tests](https://vitest.dev/guide/#writing-tests) for more information.

### `pnpm storybook`

Starts up a storybook server to host any components that have been generated with a storybook file.

More on how to set up stories at: https://storybook.js.org/docs/writing-stories#defining-stories

## git hooks

Husky is used to provide access to git hooks. The `prepare` script runs automatically the first time the project is set up via a package manager.

Husky and lint-staged are used to run scripts during certain stages of git commits. For example, running `git commit` will trigger a `pre-commit` and a `post-commit`.

You can disable husky by removing the `.husky` folder from your project and the `hooksPath` property from your `.git/config` file. After that, you can remove the `husky` and `lint-staged` packages from your project, as well as the `prepare` script and `lint-staged` properties from `package.json`.

## Additional notes

- The base manifest and thumbnail files are provided in the `public` folder.
- To add a new entry for specific manifest overrides use `da` (`da manifest my-instance "This is my instance override"` )
- The proxy server is set up with [@domoinc/ryuu-proxy](https://www.npmjs.com/package/@domoinc/ryuu-proxy) for local development to your domo instance.
