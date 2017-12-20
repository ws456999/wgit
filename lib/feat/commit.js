import chalk from 'chalk'
import commitCount from 'git-commit-count'
import inquirer from 'inquirer'
import isAdded from 'is-git-added'
import isGit from 'is-git-repository'
import config from '../questions/commit-types'
import execa from 'execa'
import pkg from '../../package.json'
import yargs from 'yargs'

import questions, { initMessage, initQuestion } from '../questions/commit'

const questionsList = questions()
const question = initQuestion()

const argv = yargs
.usage('Usage: $0')
.alias('v', 'version')
.describe('v', 'Version number')
.help('h')
.alias('h', 'help').argv

const gitCommitExeca = message => {
  execa('git', ['commit', '-m', message], { stdio: 'inherit' }).catch(() => {
    console.log(
      chalk.red(
        `\nAn error occured. Try to resolve the previous error and run following commit message again:`
      )
    )
    console.error(chalk.green(`git commit -m "${message}"`))
  })
}

export function gitAddAndCommit () {
  if (argv.v) {
    console.log(`v${pkg.version}`)
  } else if (!isGit) {
    console.error(
      'fatal: Not a git repository (or any of the parent directories): .git'
    )
  } else if (!isAdded) {
    console.error(
      chalk.red(`Please`),
      chalk.bold('git add'),
      'some files first before your commit'
    )
  } else if (
    commitCount() === 0 &&
    typeof config['initial-commit'] === 'object' &&
    config['initial-commit'].isEnabled
  ) {
    const message = initMessage(config)

    inquirer
      .prompt(question)
      .then(
        answers => (answers.initCommit ? gitCommitExeca(message) : undefined)
      )
  } else {
    inquirer.prompt(questionsList).then(answers => {
      const message = answers.body
        ? `${answers.editor}`
        : `${answers.type} ${answers.description}`
      return gitCommitExeca(message)
    })
  }
}
