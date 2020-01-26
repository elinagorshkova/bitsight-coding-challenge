'use strict'
// handlebars
const reposTable = require('./../templates/top-repos.handlebars')
const usersTable = require('./../templates/top-users.handlebars')

const store = require('./../store')

// Feedback in case something goes wrong
const failure = () => {
  $('#message').text('Oops! Unexpected error')
}

const getTopReposSuccess = (data) => {
  // populating the handlebar table with the data from the API
  const reposTableHtml = reposTable({ repos: data.items })
  // Feedback - just a nice thing for UX
  $('#message').text('Your repositories report is ready')
  // populating a div element with the hadlebar
  $('.content').html(reposTableHtml)
}

const getTopUsersSuccess = (data) => {
  data.items.forEach(user => {
    // always start executing the funcion with brand new variables page and followersCount
    const followersCount = 0
    const page = 1
    followersApiCall(user.followers_url, page, followersCount)
      .then((res) => {
        // adding a new key-value pair to our user in the JSON object
        user.followers = res
        return user.followers
      })
      .then(() => {
        // when thee async functions are done, we can now populate the handlebars with the updated data
        const usersTableHtml = usersTable({ users: data.items })
        $('.content').html(usersTableHtml)
        $('#message').text('Your users report is ready')
      })
  })
}

// The function counts the number of followers
const followersApiCall = (url, page, initialCount) => {
  return $.ajax({
    // set the limit to a max - 100 elements per page
    url: `${url}?per_page=100&page=${page}`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
    .then(res => {
      // if there is less than 100 elements on the first page, we don`t have to chec the others
      if (res.length <= 100) {
        // adding the number of followers to pre-existed counter
        initialCount = initialCount + res.length
        store.count = initialCount
        return initialCount
      } else {
        // if the page is full, adding mex number of elements to our counter
        initialCount = initialCount + 100
        // going to the next page: 1 => 2, 2 => 3, etc
        page++
        // recursively caling the function for the next page
        followersApiCall(url, page, initialCount)
      }
    })
}

module.exports = {
  getTopReposSuccess,
  getTopUsersSuccess,
  failure
}
