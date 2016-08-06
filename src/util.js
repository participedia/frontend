/* global XMLHttpRequest */

export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function readTextFile (file, callback) {
  let rawFile = new XMLHttpRequest()
  rawFile.overrideMimeType('application/json')
  rawFile.open('GET', file, true)
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status === '200') {
      callback(rawFile.responseText)
    }
  }
  rawFile.send(null)
}
