'use strict'

const reposTable = require('./../templates/top-repos.handlebars')
const usersTable = require('./../templates/top-users.handlebars')
const store = require('./../store')

const getTopReposSuccess = (data) => {
  const reposTableHtml = reposTable({ repos: data.items })
  $('#message').text('Your repositories report is ready')
  $('.content').html(reposTableHtml)
}

const getTopUsersSuccess = (data) => {
  data.items.forEach(user => {
    const followersCount = 0
    const page = 1
    apiCall(user.followers_url, page, followersCount)
      .then((res) => {
        user.followers = res
        return user.followers
      })
      .then(() => {
        const usersTableHtml = usersTable({ users: data.items })
        $('.content').html(usersTableHtml)
        $('#message').text('Your users report is ready')
      })
  })
}
const apiCall = (url, page, initialCount) => {
  return $.ajax({
    url: `${url}?per_page=100&page=${page}`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
    .then(res => {
      if (res.length <= 100) {
        initialCount = initialCount + res.length
        store.count = initialCount
        return initialCount
      } else {
        initialCount = initialCount + 100
        page++
        apiCall(url, page, initialCount)
      }
    })
}

const failure = () => {
  $('#message').text('Oops! Unexpected error')
}
module.exports = {
  getTopReposSuccess,
  getTopUsersSuccess,
  failure
}
