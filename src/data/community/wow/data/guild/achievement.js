// Require configs
const configBlizzardAPI = require('config').get('blizzard');

// Require module libraries
const _ = require('lodash');
const AppRoot = require('app-root-path');
const BlizzardJS = require('blizzard.js').initialize({ apikey: configBlizzardAPI.get('api.key') });
const Sequelize = require('sequelize');

// Require specific files to load
const Data = require(AppRoot + '/src/data');

class AchievementGuildDataWowCommunityData extends Data {
  constructor(options) {
    super();
    this.name = 'Achievement Guild Data World of Warcraft Community Data';
    this.description = 'The achievement data from the World of Warcraft community data endpoints.';
    this.scope = 'community';
    this.dataPath = 'data/community/wow/achievement/';
    this.dataFilename = 'achievement';
  }

  request() {
    return BlizzardJS.wow.data('guild-achievements',  { origin: 'us' })
      .then(response => {
        return response.data.achievements;
      })
      .catch(() => {
        new Error('FetchFailed')
      });
  }

  process(achievements, arr) {

    _.map(arr, obj => {
      if (obj.hasOwnProperty('achievements')) {
        achievements = this.process(achievements, obj.achievements);
      }

      if (obj.hasOwnProperty('categories')) {
        achievements = this.process(achievements, obj.categories);
      }

      if (obj.hasOwnProperty('title')) {
        achievements.push(obj);
      }
    });

    return achievements;
  }

  store(source) {
    if (source) {
      let yamlData = this.readStorage(this.dataPath, this.dataFilename);
      console.log('Guild Data Achievements read from file: ' + yamlData);
      let composed = _.map(source, item => _.merge(_.pick(item, ['id']), { locale : 'en_US' }));
      let merged = _.merge(yamlData, composed);
      //console.log(merged);
      let sorted = _.sortBy(merged, ['id']);
      this.writeStorage(sorted, AppRoot + '/' + this.dataPath, this.dataFilename)
    }
  }

}

module.exports = new AchievementGuildDataWowCommunityData();
