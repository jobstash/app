# Recruiters.RIP -> APP

This project is a Next.js application with integrated Storybook for component development.

## Getting Started

This section contains the step needed to run the application locally on your machine.

1. Have Node.js and Npm installed firstly by running: `brew install nodejs`
2. Install `n` as a Node Version manager using: `npm install -g n`
3. Install the LTS version of nodejs/npm using: `sudo n lts`
4. Clone the repository: `git clone https://github.com/RecruitersRip/app.git`.
5. Install Yarn: `npm install --global yarn` and verify: `yarn --version`.
6. Install dependencies: `cd app/ && yarn`
7. Create a new `env.local` paste from `.env.example.` and append keys/uris.
8. To start the application in development, run the following command: `yarn dev:css`.
9. Go to the `http://localhost:3000` port.
10. To run the React Storybook: `yarn storybook:dev`.
11. Open `http://localhost:6006` to view the Storybook in the browser.

## Features

- Next.js for server-rendered React applications.
- Storybook for developing and showcasing UI components.
- Automatic code splitting and optimized production builds.
- Built-in support for environment variables.
- Customizable webpack config.
- Prettier for code formatting.

## File Structure

```ascii
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

- [NextJS: the React Framework for Production](https://nextjs.org/docs)
- [Tailwindcss: rapidly build modern websites without ever leaving your HTML](https://tailwindcss.com/)
- [Jotai: primitive and flexible state management for React.](https://docs.pmnd.rs/jotai/introduction)
- [next-validations: NextJS API Validations, support Yup, Fastest-Validator, Joi, and more](https://next-validations.productsway.com/)
- [zod: TypeScript-first schema validation with static type inference](https://github.com/colinhacks/zod)
- [consola: Elegant Console Logger for Node.js and Browser 🐨](https://github.com/unjs/consola)
- [Storybook: build bulletproof UI components faster](https://storybook.js.org)
- [React-hook-form: performance, flexible and extensible forms with easy-to-use validation](https://www.react-hook-form.com/)
- [react-testing: simple and complete testing utilities that encourage good testing practices](https://testing-library.com/)
- [React-query: performant and powerful data synchronization for React](https://react-query.tanstack.com/)
- And other standard tools as [Eslint](https://eslint.org/), [Prettier](https://prettier.io/), [nano-staged](https://github.com/usmanyunusov/nano-staged)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/recruitersrip/app/tags).
