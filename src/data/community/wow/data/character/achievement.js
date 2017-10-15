const _ = require('lodash')
const AppRoot = require('app-root-path')
const BlizzardJS = require('blizzard.js').initialize({apikey: 'api_key_goes_here_for_now'})
const Sequelize = require('sequelize')

const Data = require(AppRoot + '/src/data')

class AchievementCharacterDataWowCommunityData extends Data {
  constructor (options) {
    super()
    this.name = 'Achievement Character Data World of Warcraft Community Data'
    this.description = 'The achievement data from the World of Warcraft community data endpoints.'
    this.scope = 'community'
    this.dataPath = 'data/community/wow/data/'
    this.dataFilename = 'character-achievements'
  }

  request () {
    return BlizzardJS.wow.data('character-achievements', { origin: 'us' })
      .then(response => {
        return response
      })
  }

  store (source) {
    let filePath = AppRoot + '/' + this.dataPath + this.dataFilename
    let yamlData = Data.getStorage(filePath)
    if (source) {
      // console.log(source.data);
      let requestData = _.flatMapDeep(source.data, ['id'])
      console.log(requestData)
      /* requestData.forEach(item => {
        console.log(item);
      }); */
      return true
    }
  }
}

module.exports = new AchievementCharacterDataWowCommunityData()
