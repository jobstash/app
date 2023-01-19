# Recruiters.RIP -> APP

This project is a Next.js application with integrated Storybook for component development.

## Getting Started

1. Clone the repository: `git clone https://github.com/recruitersrip/app.git`
2. Navigate to the project directory: `cd app`
3. Install dependencies: `yarn`
4. Start the Next.js development server: `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Storybook

1. Start the Storybook server: `yarn storybook`
2. Open [http://localhost:6006](http://localhost:6006) to view the Storybook in the browser.

## Features
- Next.js for server-rendered React applications.
- Storybook for developing and showcasing UI components.
- Automatic code splitting and optimized production builds.
- Built-in support for environment variables.
- Customizable webpack config.

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
