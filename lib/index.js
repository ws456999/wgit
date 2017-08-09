import chalk from 'chalk'
import commitCount from 'git-commit-count'
import execa from 'execa'
import inquirer from 'inquirer'
import isAdded from 'is-git-added'
import isGit from 'is-git-repository'
import updateNotifier from 'update-notifier'
import yargs from 'yargs'

import pkg from '../package.json'

const gitCommitExeca = message => {
  execa('git', ['commit', '-m', message], { stdio: 'inherit' })
    .catch(() => {
      console.log(chalk.red(`\nAn error occured. Try to resolve the previous error and run following commit message again:`))
      console.error(chalk.green(`git commit -m "${message}"`))
    })
}

const argv = yargs
  .usage('Usage: $0')
  .alias('v', 'version')
  .describe('v', 'Version number')
  .help('h')
  .alias('h', 'help')
  .argv

updateNotifier({ pkg }).notify()

if (argv.v) {
  console.log(`v${pkg.version}`)
} else if (!isGit) {
  console.error('fatal: Not a git repository (or any of the parent directories): .git')
} else if (!isAdded) {
  console.error(chalk.red(`Please`), chalk.bold('git add'), 'some files first before your commit')
} else if (commitCount() === 0) {
  console.log(1)
  // gitCommitExeca('this is my first commit')
  // console.error(chalk.red('here is nothing to commit'))

  // inquirer.prompt(question).then(answers => (
  //   answers.initCommit ? gitCommitExeca(message) : undefined
  // ))
} else {
  console.log(2)
  // inquirer.prompt(questionsList).then((answers) => {
  //   const typeScope = combineTypeScope(answers.type, answers.scope)
  //   const message = answers.body ? `${answers.editor}` : `${typeScope} ${answers.description}`

  //   return gitCommitExeca(message)
  // })
}
