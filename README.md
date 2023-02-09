# Recruiters.RIP -> APP

This project is a Next.js application with integrated Storybook for component development.

## Required System Setup

This section contains the steps needed set up your system.
_The key takeaway is you need NodeJS LTS (18.x.x) installed._

1. Have Node.js and Npm installed firstly by running: `brew install nodejs`
2. Install `n` as a Node Version manager using: `npm install -g n`
3. Install the LTS version of nodejs/npm using: `sudo n lts`
4. Install madge globally: `npm i -g madge`
5. Install Yarn: `npm install --global yarn` and verify: `yarn --version`.

## Setting up the app locally

1. Clone the repository: `git clone https://github.com/RecruitersRip/app.git`.
2. Install dependencies: `cd app/ && yarn`
3. Init husky: `npx husky install`
4. Create a new `env.local` paste from `.env.example.` and append keys/uris.

## Starting the app

This section contains the step needed to run the application locally on your machine.

1. To start the application in development, run the following command: `yarn dev`.
2. Go to the `http://localhost:3000` port.
3. To run the React Storybook: `yarn storybook`.
4. Open `http://localhost:6006` to view the Storybook in the browser.

## Features

- Next.js for server-rendered React applications.
- Storybook for developing and showcasing UI components.

## Deployment

1. Build the application: `yarn build`
2. Create and merge a PR to `dev`
3. Wait for the deployment to Fly.io to complete

## Built With

- [NextJS: the React Framework for Production](https://nextjs.org/docs)
- [Tailwindcss: rapidly build modern websites without ever leaving your HTML](https://tailwindcss.com/)
- [Storybook: build bulletproof UI components faster](https://storybook.js.org)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/recruitersrip/app/tags).

## Important Notes

### On mocked data

- When using mock data for Server-side rendering (SSR), accessing specific items, such as active cards, can be difficult because the mock data is generated randomly. If you try to access an item that is not defined in the mock data, you will get a 404 error just like you would in production. Here are the list of cards guaranteed to exist (one per section):

  - `/jobs/uniswap-labs-senior-frontend-engineer-12345/details`
  - `/organizations/uniswap-labs/details`
  - `/projects/uniswap-uni/details`
  - `/repositories/uniswap-interface/details`
