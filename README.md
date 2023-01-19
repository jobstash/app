# Recruiters.RIP -> APP

This project is a Next.js application with integrated Storybook for component development.

## Getting Started

This section contains the step needed to run the application locally on your machine.

1. Have Node.js and Npm installed firstly by running: `brew install nodejs`
2. Clone the repository: `git clone https://github.com/RecruitersRip/app.git`.
3. Install Yarn: `npm install --global yarn` and verify: `yarn --version`.
4. Install dependencies: `cd app/ && yarn`
5. Create a new `env.local` paste from `.env.example.` and append keys/uris.
6. To start the application in development, run the following command: `yarn dev`.
7. Go to the `http://localhost:3000` port.
8. To run the React Storybook: `yarn storybook`.
9. Open `http://localhost:6006` to view the Storybook in the browser.

## Features

- Next.js for server-rendered React applications.
- Storybook for developing and showcasing UI components.
- Automatic code splitting and optimized production builds.
- Built-in support for environment variables.
- Customizable webpack config.
- Prettier for code formatting.

## File Structure

```
project-folder/
├── .storybook/
│   ├── config.ts
│   └── webpack.config.ts
├── components/
│   ├── [ComponentName]/
│   │   ├── index.tsx
│   │   ├── [ComponentName].tsx
│   │   └── [ComponentName].stories.tsx
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── ...
├── static/
├── tsconfig.json
├── tslint.json
├── .gitignore
├── .next/
├── package.json
├── README.md
└── yarn.lock
```

## Deployment

1. Build the application: `yarn build`
2. Create and merge a PR to `dev`
3. Wait for the deployment to Fly.io to complete

## Built With

- [Next.js](https://nextjs.org/) - Framework for server-rendered React applications
- [Storybook](https://storybook.js.org/) - UI component development and testing
- [Webpack](https://webpack.js.org/) - Bundle and asset management
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/recruitersrip/app/tags).
