'use strict'
const reposTable = require('./../templates/top-repos.handlebars')

const getTopReposSuccess = (data) => {
  console.log('Data is: ', data)
  const reposTableHtml = reposTable({ repos: data.items })
  $('.content').html(reposTableHtml)
}

const failure = () => {
  console.error()
}
module.exports = {
  getTopReposSuccess,
  failure
}
