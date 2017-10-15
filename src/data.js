const FS = require('fs')
const Glob = require('glob')
const Path = require('path')
const YamlJS = require('js-yaml')

class Data {
  constructor (options) {
    this.type = this.constructor.name
  }

  get response () {
    return this._response
  }

  set response (response) {
    this._response = response
  }

  static instances () {
    const data = []
    // Load All Data Classes
    Glob.sync('./src/data/**/*.js').forEach(file => {
      data.push(require(Path.resolve(file)))
    })
    return data
  }

  static scoped (name = null) {
    const data = []
    this.instances().forEach(item => {
      if (item.scope === name) {
        data.push(item)
      } else {
        data.push(item)
      }
    })
    return data
  }

  static run (scoped = null) {
    this.scoped(scoped).forEach(data => {
      return data.request()
        .then(result => {
          data.store(result)
        })
    })
  }

  static getStorage (filePath, extension) {
    if (FS.existsSync(filePath + extension)) {
      if (extension === 'js') {
        return JSON.parse(FS.readFileSync(filePath + '.' + extension, 'utf8'))
      } else if (extension === 'yaml') {
        return YamlJS.safeLoad(FS.readFileSync(filePath + '.' + extension, 'utf8'))
      } else {
        return false
      }
    } else {
      FS.openSync(filePath + extension, 'a')
      return false
    }
  }
}

module.exports = Data
