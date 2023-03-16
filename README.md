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

### On jobs data

- When viewing the app for local dev, accessing specific job posts can be tricky since url depends on job-post data.  
Here are the list of jobs with data:
  - `/jobs/argent-lead-software-engineer-VKRSXh/details` -> job-post w/o project
  - `/jobs/tessera-full-stack-engineer-remote-eu-MnKwY1/details` -> job-post with project
  - `jobs/opensea-senior-software-engineer-full-stack-TnKvW1/details` -> job-post with funding round details

### How to run `app` on local https

1. Create local certs:
    - Install [mkcert](https://github.com/FiloSottile/mkcert) - `brew install mkcert` or `choco install mkcert`
    - Run `mkcert -install`
    - Run `mkcert localhost`

2. Install [local-ssl-proxy](https://github.com/cameronhunter/local-ssl-proxy) - `npm i -g local-ssl-proxy`
3. Run these commands on separate terminals
    - `yarn dev:ssl` or `yarn start:ssl`
    - `yarn proxy:ssl`
