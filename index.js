#! /usr/bin/env node

const _ = require('lodash')
const Yargs = require('yargs')

const Pkg = require('./package.json')
const Data = require('./src/data')

// https://gist.github.com/zambon/8b2d207bd21cf4fcd47b96cd6d7f99c2
_.mixin({
  deeply: map =>
    (obj, fn) =>
      map(_.mapValues(obj, (v) => {
        if (_.isPlainObject(v)) {
          return _.deeply(map)(v, fn)
        } else if (_.isArray(v)) {
          return _.map(v, item => _.deeply(map)(item, fn))
        }
        return v
      }), fn)
})

module.exports = Yargs
  .command({
    command: 'data <key> [value]',
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'false'),
    handler: (argv) => {
      switch (argv.key) {
        case 'all':
          Data.run()
          break
        case 'community':
        case 'comm':
          Data.run('community')
          break
        case 'community-oauth-profile':
        case 'comm-oauth-prof':
          Data.run('community-oauth-profile')
          break
        case 'game-data':
          Data.run('game-data')
          break
        default:
          console.log('Command not found...')
      }
    }
  })
  .version(Pkg.version)
  .alias('version', 'v')
  .help('help')
  .alias('help', 'h')
  .demandCommand()
  .argv
