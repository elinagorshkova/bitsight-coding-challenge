'use strict'

// Formatting the data so we can send it with the api request in the url
const formatData = (date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  // If month is February (3.lenght < 2), formatting it like 02
  if (month.length < 2) {
    month = '0' + month
  }
  // same with the date
  if (day.length < 2) {
    day = '0' + day
  }
  // converting the array to a string YYYY-MM-DD
  return [year, month, day].join('-')
}

module.exports = {
  formatData
}
