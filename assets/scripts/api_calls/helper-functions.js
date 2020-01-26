'use strict'

const store = require('./../store')

const formatData = (date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }
  return [year, month, day].join('-')
}

const countFollowers = (user) => {
  let followersCount = 0
  let page = 1
  const apiCall = () => {
    return $.ajax({
      url: `${user.followers_url}?per_page=100&page=${page}`,
      method: 'GET',
      accepts: 'application/vnd.github.v3+json'
    })
      .then(res => {
        if (res.length <= 100) {
          followersCount = followersCount + res.length
          store.count = followersCount
          return followersCount
        } else {
          followersCount = followersCount + 100
          page++
          apiCall()
        }
      })
  }
  apiCall()
    .then(() => {
      return store.count
    })
  console.log('store.count', store.count)
  return store.count
}

module.exports = {
  formatData,
  countFollowers
}
