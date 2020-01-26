'use strict'
const helpers = require('./helper-functions')

const getTopRepos = () => {
  let date = new Date()
  date.setMonth(date.getMonth() - 1)
  date = helpers.formatData(date)
  return $.ajax({
    url: `https://api.github.com/search/repositories?q=created:${date}&sort=stars&order=desc&type=Repositories%27&page=1&per_page=5`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
}

const getTopUsers = () => {
  let date = new Date()
  date.setFullYear(date.getYear() + 1900 - 1)
  date = helpers.formatData(date)
  return $.ajax({
    url: `https://api.github.com/search/users?q=created:${date}&sort=followers&order=desc&page=1&per_page=5`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
}

module.exports = {
  getTopRepos,
  getTopUsers
}
