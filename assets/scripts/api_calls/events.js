'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const addHandlers = () => {
  $('#hot_repo').on('click', onGetTopRepos)
  $('#prolific_users').on('click', onGetTopUsers)
}

const onGetTopRepos = () => {
  clearInterval(store.intervalTimerId)
  api.getTopRepos()
    .then(ui.getTopReposSuccess)
    .catch(ui.failure)
}

const onGetTopUsers = () => {
  api.getTopUsers()
    .then((res) => {
      ui.getTopUsersSuccess(res)
      store.intervalTimerId = setInterval(function () {
        ui.getTopUsersSuccess(res)
      }, 120 * 1000)
    })
    .catch(ui.failure)
}

module.exports = {
  addHandlers
}
