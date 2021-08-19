const fetch = require('isomorphic-unfetch')
const get = require('lodash/get')

const BASE_URL = 'https://backend-moonmakers-video.herokuapp.com'

const checkStatus = response => {
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    return Promise.reject(error)
  }
}

const toJson = response => response.json()

const extractData = json => get(json, 'data', [])

const request = (endpoint = '') =>
  fetch(`${BASE_URL}${endpoint}`)
    .then(checkStatus)
    .then(toJson)
    .then(extractData)

const fetchPopular = () => request(`/api/videos`)

module.exports = {
  fetchPopular,
}
