# Jobstash-> APP

This project is a Next.js application (pages dir) using Nx monorepo.

## Required System Setup

This section contains the steps needed set up your system.
_The key takeaway is you need NodeJS LTS (18.x.x) installed._

1. Have Node.js and Npm installed firstly by running: `brew install nodejs`
2. Install `n` as a Node Version manager using: `npm install -g n`
3. Install the LTS version of nodejs/npm using: `sudo n lts`
4. Install Pnpm: `npm i -g pnpm` and verify: `pnpm --version`.

## Setting up the app locally

1. Clone the repository: `git clone https://github.com/jobstash/app.git`.
2. Install dependencies: `cd app/ && pnpm install`
3. Init husky: `npx husky install`
4. Create a new `env.local` in `apps/web` folder based from `.env-example`.

## Starting the app

This section contains the step needed to run the application locally on your machine.

1. To start the application in development, run `pnpm dev:ssl`
2. Open another terminal and run `pnpm proxy:ssl`.
3. Go to `https://localhost:3000` to view the app.

## Built With

- [Nx: Smart, Fast Extensible Build System](https://nx.dev)
- [NextJS: the React Framework for Production](https://nextjs.org/docs)
- [Tailwindcss: rapidly build modern websites without ever leaving your HTML](https://tailwindcss.com/)

## Dev

1. Make sure `husky` is installed.
2. Do commits as usual. Make sure all lints passed.
3. Push to `dev` branch or better yet, open a PR for review.

## How to run `app` on local https

1. Create local certs:
    - Install [mkcert](https://github.com/FiloSottile/mkcert) - `brew install mkcert` or `choco install mkcert`
    - Run `mkcert -install`
    - Run `mkcert localhost`

2. Install [local-ssl-proxy](https://github.com/cameronhunter/local-ssl-proxy) - `npm i -g local-ssl-proxy`
3. Run these commands on separate terminals
    - `NODE_TLS_REJECT_UNAUTHORIZED=0 yarn dev:ssl` or `NODE_TLS_REJECT_UNAUTHORIZED=0 yarn start:ssl`
    - `yarn proxy:ssl`

## Nx Monorepo

- Libs are categorized as one of the following:
  - `core` - constants, interfaces, type definitions and other shared instances
  - `utils` - any utility functions
  - `data` - fetch functions and other api related utilities
  - `state` - client state e.g. hooks, atoms, etc
  - `ui` - components which ideally should be stateless
  - `feature` - components which preferrably all state and data fetching happens
  - `pages` - individual pages exported as default and used by `nextjs`
  - `app` - the application consuming all these libs
- There's a hierarchy among these libs. For instance, `core` libs should not be able to import other libs, `util` libs can't import hooks etc. This rules are in place for maintainability and best practices. For specific rules check `@nx/enforce-module-boundaries` in `.eslintrc.json`
- You can view this hierarchy in your browser by runing `pnpm nx graph`
- This monorepo also takes advantage of `nx`'s cache which is extremely useful when performing lots of builds and tests. For instance when running all tests, if there are no changes associated with the lib and its dependencies, it will skip the test for this lib and all its dependencies too. This results in much faster time for all tests. More info here: [Nx Cache Task Results](https://nx.dev/core-features/cache-task-results)
