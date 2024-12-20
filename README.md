# Introduction

This project contains all of the assets related to my personal website hosted at [laureladastra.com](https://laureladastra.com).
| Topic               | Status                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application Version | [<img src="https://img.shields.io/badge/version-1.0.0-blue.svg">](html/package.json)                                                              |
| Build               | ![Azure DevOps builds](https://img.shields.io/azure-devops/build/quantaleap/Product%20Development/43?label=laureladastra.homepage-html)           |
| Release             | ![Azure DevOps builds](https://img.shields.io/azure-devops/build/quantaleap/6206cff7-06ac-401d-988d-bf459fd9dedb/44?label=laureladastra.homepage) |
| Availability        | ![Website](https://img.shields.io/website?down_message=down&label=production&up_message=up&url=https%3A%2F%2Flaureladastra.com)                   |

## Getting Started

### Prerequisites

The following software packages are required to contribute to this project:

- Node.js/npm version `>=22.3.0` and `>=10.8.1`
- PowerShell Core version `>=7.2.7`

Install the following software to get started with contributing:

- [Node.js/npm version](https://nodejs.org/en/)
- [PowerShell Core](https://github.com/PowerShell/PowerShell) version `>=7.0.0`

### Installation

Install the required software and run the installation script at `release/hooks/install.hooks.ps1` to install git hooks. No specific additional steps are required to start contributing to this project.

### Project Structure

The project is a generic HTML front-end with minimal dependencies (`Bootstrap 5.0` & `jQuery`) + SASS for styling.:

``` markdown
*
├─ css
├─ img
├─ js
├─ sass
├─ webfonts
├─ index.html
```

Everything is centrally versioned and packaged. The website is hosted on Microsoft Azure/Static Web Apps.

### Development workflow

You can start developing from the `html/src` folder while running:

``` bash
npm run watch
```

The NPM `watch` task will automatically compile SASS assets when files are updated. 

The `build` task can be used to compile the entire project. This will make the assets available from the `build` folder.

``` bash
npm run build
```

### Testing and building

[NPM scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) are implemented to streamline test and build processes. All of the required scripts are referenced within `package.json`. They can be executed by running:

```bash
# execute tool from 'devDependencies'
$ npx run <command>
```

The following areas are covered:

| Tool      | Activity                              | Command        | Type     |
| --------- | ------------------------------------- | -------------- | -------- |
| ESLint    | Check code format                     | npm run check  | QA       |
| Prettier  | Format code                           | npm run format | QA       |
| NPM audit | Check vulnerabilities in NPM packages | npm audit      | Security |
| Grunt     | Build project assets for production   | npm run build  | Build    |

Build tasks can be ran seperately according to preference:

```bash
# run build for different environments
$ npx grunt <environment> <task>

#example
$ npx grunt build clean
```

When publishing the code, a git pre-push hook is implemented to govern code quality. The test and security scripts are executed during this process.

### CI/CD

The build and release pipelines are hosted on Azure DevOps within the `Product Development` project:

- laureladastra.homepage-html (build HTML)
- laureladastra.homepage (release)

The templates for the pipelines can be consulted from the `release/pipelines` directory.

The build pipelines are automatically triggered when changes are pushed to `main`. The release pipeline can be manually started. The pipeline accepts the following parameters:

| Value           | Description                                                                                                                           | Default | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| Commit          | Select specific commit to check out on the branch                                                                                     | null    | n        |
| HTML version    | Version of the build artifacts. Can be retrieved by copying the run id of the pipeline that produced the artifacts (i.e.: 20221020.9) | latest  | n        |
| Publish version | Whether the release should be published on Github                                                                                     | false   | n        |
| Release version | The version for the published release (semver format)                                                                                 | null    | n        |
| Release author  | The author for the published release (points to Github service connection)                                                            | null    | n        |
