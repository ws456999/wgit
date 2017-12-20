#!/usr/bin/env node

import yargs from 'yargs'
import updateNotifier from 'update-notifier'
import inquirer from 'inquirer'

import pkg from '../package.json'
import { gitBranchCheckout } from './feat/bc'
import { gitAddAndCommit } from './feat/commit'
import featsList from './questions/feats'

const argv = yargs
  .usage('Usage: $0')
  .alias('v', 'version')
  .describe('v', 'Version number')
  .help('h')
  .alias('h', 'help').argv

updateNotifier({ pkg }).notify()

const feats = {
  gitCheckout () {
    var exec = require('child_process').exec
    var opts = process.argv.slice(3)
    gitBranchCheckout(exec, opts)
  },
  gitAddAndCommit () {
    gitAddAndCommit()
  }
}

if (argv._.indexOf('bc') > -1) {
  feats.gitCheckout()
} else {
  inquirer.prompt(featsList).then(answers => {
    feats[answers.feat]()
  })
}
