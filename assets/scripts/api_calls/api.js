'use strict'
const helpers = require('./helper-functions')

// GET request to fetch the most popular repos data
const getTopRepos = () => {
  // we want to make the date dynamic, so we will use the Date JS class
  let date = new Date()
  // set the date to a month ago
  date.setMonth(date.getMonth() - 1)
  // by default, the date is formatted like Sun Dec 17 1995
  // API exprect the date to be formatted as YYYY-MM-DD
  // see the function in assets/scripts/api_calls/helper_functions
  date = helpers.formatData(date)
  return $.ajax({
    url: `https://api.github.com/search/repositories?q=created:${date}&sort=stars&order=desc&page=1&per_page=5`,
    method: 'GET',
    // the header is recommended by GitHub
    accepts: 'application/vnd.github.v3+json'
  })
}

const getTopUsers = () => {
  let date = new Date()
  // Getting a previous year
  date.setFullYear(date.getFullYear() - 1)
  date = helpers.formatData(date)
  return $.ajax({
    // The incoming JSON file is already sorted, filtered, and reduced to 5 top objects
    url: `https://api.github.com/search/users?q=created:${date}&sort=followers&order=desc&page=1&per_page=5`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
}

module.exports = {
  getTopRepos,
  getTopUsers
}
