# Introduction

This project contains all of the assets related to my personal website hosted at [laureladastra.com](https://laureladastra.com).

## Getting Started

### Prerequisites

The following software packages are required to contribute to this project:

- Node.js/npm version `>=22.3.0` and `>=10.8.1`
- PowerShell Core version `>=7.2.7`

### Design & Technologies

Generic front-end with minimal dependencies (`Bootstrap 5.0` & `jQuery`) + SASS for styling.

### Testing and building

[NPM scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) are implemented to streamline test and build capabilities. All of the required scripts are referenced within the `package.json` file. They can be executed by running:

```bash
# install NPM dependencies
$ npm install

# run NPM script
$ npm run <command>
```

The following areas are covered:

| Tool              | Activity                              | Command        | Type     |
| ----------------- | ------------------------------------- | -------------- | -------- |
| ESLint + Prettier | Check code format quality             | npm run check  | QA       |
| Pester            | Check repository structure            | npm run pester | QA       |
| NPM audit         | Check vulnerabilities in NPM packages | npm audit      | Security |
| Grunt             | Build project assets for production   | npm run build  | Build    |

When publishing the code, git pre-commit and pre-push hooks are implemented to govern code quality. Test and security scripts are ran during the CI process.