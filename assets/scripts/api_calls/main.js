'use strict'

//  Getting data from the github application
const addHandlers = () => {
  $('#hot_repo').on('click', getTopRepos)
  $('#prolific_users').on('click', getTopUsers)
}

const getTopRepos = () => {
  let date = new Date()
  date.setMonth(date.getMonth() - 1)
  date = formatData(date)
  return $.ajax({
    url: `https://api.github.com/search/repositories?q=created:${date}&sort=stars&order=desc&type=Repositories%27&page=1&per_page=5`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
    .then(res => {
      console.log(res)
    })
}

const getTopUsers = () => {
  let date = new Date()
  console.log(date.getYear())
  date.setFullYear(date.getYear() + 1900 - 1)
  date = formatData(date)
  console.log(date)
  return $.ajax({
    url: `https://api.github.com/search/users?q=created:${date}&sort=followers&order=desc&page=1&per_page=5`,
    method: 'GET',
    accepts: 'application/vnd.github.v3+json'
  })
    .then(res => {
      console.log(res)
    })
}

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

getTopRepos()
module.exports = {
  addHandlers,
  getTopRepos,
  getTopUsers
}
