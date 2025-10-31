# Introduction

This project contains all the resources that support [laureladastra.com](https://laureladastra.com).

| Topic               | Status                                                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application Version | [<img src="https://img.shields.io/badge/version-2.1.0-blue.svg">](html/package.json)                                                                                                     |
| Build Pipeline      | ![Azure DevOps builds](https://img.shields.io/azure-devops/build/quantaleap/Product%20Development/49?label=laureladastra.homepage-html)                                                  |
| Release Pipeline    | ![Azure DevOps builds](https://img.shields.io/azure-devops/build/quantaleap/6206cff7-06ac-401d-988d-bf459fd9dedb/50?label=laureladastra.homepage)                                        |
| Website             | ![Website](https://img.shields.io/website?down_message=down&label=development%20&up_message=up&url=https%3A%2F%2Fwonderful-grass-0ec289e03-development.westeurope.4.azurestaticapps.net) |
| Website             | ![Website](https://img.shields.io/website?down_message=down&label=production&up_message=up&url=https%3A%2F%2Fwonderful-grass-0ec289e03.4.azurestaticapps.net)                            |

## Getting Started

### Prerequisites

The following software packages are required to contribute to this project:

- Node.js/NPM version `>=22.3.0` and `>=10.8.1`
- PowerShell Core version `>=7.5.2`

Install the following software to get started with contributing:

- [Node.js/NPM](https://nodejs.org/en/)
- [NVM](https://github.com/nvm-sh/nvm)
- [PowerShell Core](https://github.com/PowerShell/PowerShell)

### Installation

Install the required software and run the installation script at `release/hooks/install.hooks.ps1` to install git hooks. No specific additional steps are required to start contributing to this project.

### Project Structure

This workpace is organised as a monorepo where assets from two seperate projects are compiled into a single static website:

| `/package.json`                                                                             | `/blog/.package.json` and `/blog/themes/tranquilpeak/.package.json`    |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| generic front-end with minimal dependencies (`Bootstrap 5.0` & `jQuery`) + SASS for styling | a [`Hexo`](https://hexo.io/) based blog that implements a custom theme |

The following directory structure is adopted:

```markdown
├── blog (project 2 - blog site)
│   ├── build
│   ├── source
│   ├── themes
│   │   ├── package.json
│   ├── package.json
├── build
├── src (project 1 - index site)
│   ├── index.html
└── package.json
```

The website is hosted on Microsoft Azure/Static Web Apps.

### Development workflow

You can start developing from the `src` folder while running:

```bash
yarn run watch
```

The NPM `watch` task will automatically compile SASS assets when files are updated.

The `build` task can be used to compile the entire project. This will make the assets available from the `build` folder.

```bash
yarn run build
```

For the blog, the same workflow applies with the sole difference that `yarn run watch` is ran from `/blog/themes/` and `yarn run start` in a seperate prompt from `/blog` to start the web server. This will start the web server that comes packaged with [Hexo](https://hexo.io).

### Testing and building

[NPM scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) are implemented to streamline test and build processes. All of the required scripts are referenced within `package.json`. They can be executed by running:

```bash
# execute default build task from Grunt
$ yarn run build

# execute tool from 'devDependencies'
$ npx run <command>
```

The following areas are covered:

| Tool      | Activity                              | Command         | Type     |
| --------- | ------------------------------------- | --------------- | -------- |
| ESLint    | Check code format                     | yarn run check  | QA       |
| Prettier  | Format code                           | yarn run format | QA       |
| NPM audit | Check vulnerabilities in NPM packages | npm audit       | Security |
| Grunt     | Build project assets for production   | yarn run build  | Build    |

Build tasks can be ran seperately according to preference:

```bash
# execute entire build task from Grunt
$ npx grunt <task>

# example (i.e. production build)
$ npx grunt -- buildProd

# execute single task rom Grunt
$ npx grunt -- <task_name>:<task_activity>

# example
$ npx grunt -- clean:folder
```

When publishing the code, a git pre-push hook is implemented to govern code quality. The test and security scripts are executed during this process.

### CI/CD

The build and release pipelines should be hosted on Azure DevOps. Templates can be found in the `release/pipelines` folder.

The build pipeline is automatically triggered when changes are pushed to `main`. The release pipeline can be manually started. This pipeline accepts the following parameters:

| Value           | Description                                                                                                                           | Default | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| Commit          | Select specific commit to check out on the branch                                                                                     | null    | n        |
| HTML version    | Version of the build artifacts. Can be retrieved by copying the run id of the pipeline that produced the artifacts (i.e.: 20221020.9) | latest  | n        |
| Publish version | Whether the release should be published on Github                                                                                     | false   | n        |
| Release version | The version for the published release (semver format)                                                                                 | null    | n        |
| Release author  | The author for the published release (points to Github service connection)                                                            | null    | n        |

The pipeline depends on a variable group. This group should be configured before building or deploying resources. The full specification of the variable set and explanations can be read in `release/pipelines/azdevops-library.template.json`.

### Comments

- Very specific styling was implemented for the `<section>`elements **appointments** and **facts** where the general definitions for margin/padding are not derived from the specifications in `_wrapper.scss` for `section .content`. Different rules apply for different viewports. Additional QA should decide whether CSS rules were defined in abundance and a more universal approach could be adopted.
