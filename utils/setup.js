#!/usr/bin/env node

const fs = require('fs')
const execa = require('execa')
const rootDir = require('./root')
const ora = require('ora');
const globby = require('globby');

async function installPeerDependencies(spinner) {
  const fileName = `${rootDir}/package.json`
  spinner.text = 'Installing peer dependencies'

  // Check if file exists
  if (fs.existsSync(fileName)) {
    // Then read file's contents
    const file = fs.readFileSync(fileName, {encoding: 'utf-8'})
    const fileContents = JSON.parse(file)
    // Then get the peerDependencies list
    const peerDepObject = fileContents.peerDependencies

    // Create an array with the dependencies@versions
    const peerDepArray = []

    for (const [key, value] of Object.entries(peerDepObject)) {
      peerDepArray.push(`${key}@${value}`)
    }

    // Then run `npm i --save-dev [all packages@versions]`
    try {
      const {stdout} = await execa('npm', ['i', '--save-dev', ...peerDepArray])
      spinner.text = `Peer dependencies installed successfully!\n\n${stdout}`
    } catch (error) {
      spinner.fail(`Peer dependencies weren't installed!\n\n${error}`)
    }
  } else {
    // Throw error if file is missing
    spinner.fail(`File ${fileName} not found!`)
  }
}

async function createEslintConfig(spinner) {
  spinner.text = 'Checking for eslint config file'

  const foundFile = await globby(['.eslint*', '!.eslintignore']);

  // Check if file exists
  if (foundFile.length > 0) {
    // If there's a file already, don't do anything
    spinner.text = 'Eslint config file already exists!'
  } else {
    fs.copyFileSync(`${rootDir}/utils/templates/.eslintrc.js`, './.eslintrc.js', () => {
      spinner.text = 'Eslint config file created!'
    })
  }
}

async function createPrettierConfig(spinner) {
  spinner.text = 'Checking for eslint config file'

  const foundFile = await globby(['.prettierrc*', 'prettier.config.*']);

  // Check if file exists
  if (foundFile.length > 0) {
    // If there's a file already, don't do anything
    spinner.text = 'Prettier config file already exists!'
  } else {
    fs.copyFileSync(`${rootDir}/utils/templates/.prettierrc.js`, './.prettierrc.js', () => {
      spinner.text = 'Prettier config file created!'
    })
  }
}

async function createVscodeSettings(spinner) {
  spinner.text = 'Checking for eslint config file'

  const foundFile = await globby(['.vscode/settings.json']);

  // Check if file exists
  if (foundFile.length > 0) {
    // If there's a file already, don't do anything
    spinner.text = 'Eslint config file already exists!'
  } else {
    if (!fs.existsSync('./.vscode')) {
      fs.mkdirSync('./.vscode')
    }

    fs.copyFileSync(`${rootDir}/utils/templates/settings.json`, './.vscode/settings.json', () => {
      spinner.text = 'Eslint config file created!'
    })
  }
}

async function start() {
  const spinner = ora('Starting configuration scripts...').start();

  try {
    // Install peerDependencies
    // await installPeerDependencies(spinner)
    // Check if .eslintrc.* file exists
    await createEslintConfig(spinner)
    // Check if .prettierrc.* or prettier.config.* file exists
    await createPrettierConfig(spinner)
    // Check if a folder .vscode with a settings.json file exists
    await createVscodeSettings(spinner)
    spinner.succeed(`Repository configuration finished.`)
  } catch (error) {
    spinner.fail(`Repository wasn't configured because of an issue...\n\n${error}`)
  }
}

start()
