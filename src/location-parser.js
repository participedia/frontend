import Parser from 'accept-language-parser'
import bestLang from 'bestlang'
import langmap from 'langmap'
import locales from '../public/locales.json'

function getLocale (acceptLang) {
  var langHeader = Parser.parse(acceptLang)
  var langArray = langHeader.map(l => l.code + (l.region ? '-' + l.region : ''))
  return bestLang(langArray, Object.keys(locales), 'en-US')
}

function getLocation (location) {
  return '/' + location.split('/').splice(2).join('/')
}

export default function (acceptLang, location) {
  var locationSplit = location.split('/')
  var locale = locationSplit[1]
  var redirect = ''

  if (!locale || !langmap[locale]) {
    // No locale or not a valid locale.
    locale = getLocale(acceptLang)
    redirect = location
  } else if (!locales[locale]) {
    // We have a valid locale, but we currently don't support it.
    locale = getLocale(acceptLang)
    redirect = getLocation(location)
  }

  return ({
    locale,
    redirect
  })
}
