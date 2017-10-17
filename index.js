#! /usr/bin/env node

// Require configs
const configBlizzardAPI = require('config').get('blizzard');

// Require module libraries
const _ = require('lodash');
const Yargs = require('yargs');

// Require specific files to load
const Pkg = require('./package.json');
const Data = require('./src/data');

/*let struct = [
  { name: 'achievements.id', call: '_.has' },
  { name: 'achievements.title', call: '_.has' }
];*/

/*_.mixin({
  findNestedObject: (object, data, struct) => {
    // Before do anything, check if parameter struct is ok, no point in doing extra work
    _.forEach(struct, item => {
      if (!item.name && (!item.criteria || !_.isFunction(item.call))) {
        throwError('Invalid structure!!!')
      }
    });

    // To avoid destroying the original array, meaning if we need to go back to the original
    // data set at any point of time, lets map it to a new set.
    _.map(object, (value, key) => {
      if (_.isPlainObject(value)) {
        _.findNestedObject(value)
      } else if (_.isArray(value) && !_.isEmpty(value)) {
        console.log('arraySize: ' + value.length);
        _.map(value, item => {
          _.findNestedObject(item)
        })
      } else {
        _.forEach(struct, item => {
          console.log('key: ' + key + '; value: ' + value);
        });
      }
    });
  }
});*/

module.exports = Yargs
  .command({
    command: 'data <key> [value]',
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'false'),
    handler: (argv) => {
      switch(argv.key) {
        case 'all':
          Data.run();
          break;
        case 'community':
        case 'comm':
          Data.run('community');
          break;
        case 'community-oauth-profile':
        case 'comm-oauth-prof':
          Data.run('community-oauth-profile');
          break;
        case 'game-data':
          Data.run('game-data');
          break;
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
  .argv;
