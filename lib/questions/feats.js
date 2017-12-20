let choicesList = [
  {
    name: '🚣‍♂️ checkout branch',
    value: 'gitCheckout'
  },
  {
    name: '🌝  submit commit',
    value: 'gitAddAndCommit'
  }
]

export default [
  {
    type: 'list',
    name: 'feat',
    message: 'Select the operate below this:',
    choices: choicesList
  }
]
