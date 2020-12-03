#!/usr/bin/env node

const fs = require('fs')
const execa = require('execa')
const rootDir = require('./root')
const ora = require('ora');

async function start() {
  const fileName = `${rootDir}/package.json`
  const spinner = ora('Installing peer dependencies').start();

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
    // Then run `npm i --save-dev [all pacakges@versions]`
    try {
      const {stdout} = await execa('npm', ['i', '--save-dev', ...peerDepArray])
      spinner.succeed(`Peer dependencies installed successfully!\n\n${stdout}`)
    } catch (error) {
      spinner.fail(`Peer dependencies weren't installed!\n\n${error}`)
    }
  } else {
    // Throw error if file is missing
    spinner.fail(`File ${fileName} not found!`)
  }
}

start()
