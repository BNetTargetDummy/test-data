// Require configs
const configBlizzard = require('config').get('blizzard');
const configStorage = require('config').get('storage');

// Require module libraries
const _ = require('lodash');
const AppRoot = require('app-root-path');
const BlizzardJS = require('blizzard.js').initialize({ apikey: configBlizzard.get('api.key') });
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
      let composed, merged, sorted, data;
      data = this.readStorage(this.dataPath, this.dataFilename, configStorage.get('type'));
      composed = _.map(source, item => _.merge(_.pick(item, ['id']), { locale : 'en_US' }));
      merged = _.merge(data, composed);
      sorted = _.sortBy(merged, ['id']);
      this.writeStorage(sorted, this.dataPath, this.dataFilename, configStorage.get('type'));
    }
  }

}

module.exports = new AchievementGuildDataWowCommunityData();
