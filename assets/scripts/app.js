'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const apiEvents = require('./api_calls/events')

$(() => {
  // your JS code goes here
  apiEvents.addHandlers()
})

// const getTopUsers = () => {
//   return $.ajax({
//     url: 'apiUrl',
//     method: 'GET'
//   })
// }
