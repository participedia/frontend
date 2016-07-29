const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const join = path.join
const resolve = path.resolve
const root = resolve(__dirname)

if (fs.existsSync(join(root, '.env') === false)) {
  console.log('This project needs you to have a .env file in the root, see the docs.\n')
  process.exit(0)
}

const dotenv = require('dotenv')
const dotEnvVars = dotenv.config()

var getConfig = require('hjs-webpack')

const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.env`),
  silent: false
})

const envVariables = Object.assign({}, dotEnvVars, environmentEnv)
const isDev = NODE_ENV !== 'production'

const defines =
  Object.keys(envVariables).reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key])
    memo[`__${key.toUpperCase()}__`] = val
    return memo
  }, {
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    NODE_ENV: JSON.stringify(NODE_ENV)
  })

var myHjsWebpackOptions = {
  in: 'src/index.js',
  out: 'public',
  clearBeforeBuild: '!(img|favicon.ico|global.css|CORS|CNAME|locales.json)'
}
var config = getConfig(myHjsWebpackOptions)

config.plugins.push(new webpack.DefinePlugin(defines))

config.plugins.push(new webpack.ProvidePlugin({
  'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
}))

const replaceLoader = (match, replacer) => (l) => {
  if (l && l.loader && l.loader.match(match)) {
    l.loader = l.loader.replace(match, replacer)
  }
}

// Happy, debuggable selectors in dev. Super compact selectors in prod.
const cssDevIdent = isDev ? '[path][name]___[local]___' : ''
const cssModulesLoader = `?modules&localIdentName=${cssDevIdent}[hash:base64:5]`
const cssModuleMatch = /(^|!)(css-loader)($|!)/
config.module.loaders.forEach(replaceLoader(cssModuleMatch, `$1$2${cssModulesLoader}$3`))

config.module.loaders.push({
  test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
  loaders: [
    'transform-loader/cacheable?brfs',
    'transform-loader/cacheable?packageify'
  ]
})
config.module.loaders.push({
  test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
  loader: 'transform-loader/cacheable?ejsify'
})

module.exports = config
