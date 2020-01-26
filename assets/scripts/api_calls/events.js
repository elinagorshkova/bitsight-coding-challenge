'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

// These events are imported in app.js file, where the event listener starts listening on document.ready
const addHandlers = () => {
  $('#hot_repo').on('click', onGetTopRepos)
  $('#prolific_users').on('click', onGetTopUsers)
}

const onGetTopRepos = () => {
  // we want to clear interval from the getTopUsers function in case it had been active before
  // for convenience, the timer ID is stored in file called store.js
  clearInterval(store.intervalTimerId)
  api.getTopRepos()
    .then(ui.getTopReposSuccess)
    // catching a possible error
    .catch(ui.failure)
}

const onGetTopUsers = () => {
  api.getTopUsers()
  // Asyn function, so we have to work with promises
    .then((res) => {
      // calling the function that populates the handlebars and renders them on the screen
      // calling the function twice, so we don`t have to wait until the setInterval expires
      ui.getTopUsersSuccess(res)
      store.intervalTimerId = setInterval(() => {
        ui.getTopUsersSuccess(res)
        // 2 minutes
      }, 120 * 1000)
    })
    .catch(ui.failure)
}

module.exports = {
  addHandlers
}
