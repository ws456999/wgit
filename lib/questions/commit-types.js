export default {
  // scope: false,
  body: true,
  emoji: true,
  'initial-commit': {
    isEnabled: true,
    emoji: ':tada:',
    message: 'Initial commit'
  },
  types: [
    {
      emoji: ':sparkles:',
      type: '✨ Feat:',
      description: 'New feature'
    },
    {
      emoji: ':bug:',
      type: '🐛 Fix:',
      description: 'Bug fix'
    },
    {
      emoji: ':memo:',
      type: '📝 Docs:',
      description: 'Documentation only changes'
    },
    {
      emoji: ':wrench:',
      type: '🔧 Chore:',
      description:
        'Changes that affect the build system or external dependencies and moving files'
    },
    {
      emoji: ':construction_worker:',
      type: '🏗️ CI:',
      description: 'Changes to our CI configuration files and scripts'
    },
    {
      emoji: ':zapr:',
      type: '🏇 Perf:',
      description: 'Code change that improves performance'
    },
    {
      emoji: ':hammer:',
      type: '🔨 Refactor:',
      description: 'Code change that neither fixes a bug nor adds a feature'
    },
    {
      emoji: ':art:',
      type: '🎨 Style:',
      description: 'Changes that do not affect the meaning of the code'
    },
    {
      emoji: ':white_check_mark:',
      type: '✅ Test:',
      description: 'Adding missing tests or correcting existing tests'
    }
  ]
}
