'use strict'
const api = require('./api')
const ui = require('./ui')

const addHandlers = () => {
  $('#hot_repo').on('click', onGetTopRepos)
  $('#prolific_users').on('click', onGetTopUsers)
}

const onGetTopRepos = () => {
  api.getTopRepos()
    .then(ui.getTopReposSuccess)
    .catch(ui.failure)
}

const onGetTopUsers = () => {
  api.getTopUsers()
    .then(res => console.log(res))
    .catch(ui.failure)
}

module.exports = {
  addHandlers
}
