const AppRoot = require('app-root-path');
const FS = require('fs-extra');
const Glob = require('glob');
const Path = require('path');
const YamlJS = require('js-yaml');
const ReadWriteLock = require('rwlock');

class Data {

  constructor(options) {
    this.type = this.constructor.name;
  }

  /*get response() {
    return this._response;
  }

  set response(response) {
    this._response = response;
  }*/

  static instances() {
    const data = [];
    // Load All Data Classes
    Glob.sync('./src/data/**/*.js').forEach(file => {
      data.push(require(Path.resolve(file)));
    });
    // console.log(data);
    return data;
  }

  static scoped(name = null) {
    const data = [];
    this.instances().forEach(item => {
      if (item.scope === name) {
        data.push(item);
      } else {
        data.push(item);
      }
    });
    // console.log(data);
    return data;
  }

  static run(scoped = null) {
    this.scoped(scoped).forEach(data => {
      // console.log(data);
      data.request()
        .then(result => {
          return data.process([], result)
        })
        .then(result => {
          console.log(result.length);
          return data.store(result)
        })
        .catch(() => {
          new Error('Fetch Failed !!!')
        });
    });
  }

  readStorage(filePath, fileName, extension, callback) {
    let fullPath = this.pathStorage(filePath, fileName, extension);
    let lock = new ReadWriteLock();
    lock.readLock(fullPath, (release) => {
      FS.readFile(fullPath, 'utf8', (error, data) => {
        let parsed;
        if (error && error.code === 'ENOENT') return callback(error);
        try {
          if (extension === 'js') {
            parsed = JSON.parse(data);
          } else if (extension === 'yaml') {
            parsed = YamlJS.safeLoad(data);
          } else {
            return callback(new Error('Invalid file type supported'));
          }
        } catch (exception) {
          return callback(exception)
        }
        //console.log(parsed);
        return callback(null, parsed);

      });
      release();
    })
  }

  writeStorage(data, filePath, fileName, extension, overwrite = true, callback) {
    let fullPath = this.pathStorage(filePath, fileName, extension);
    let lock = new ReadWriteLock();
    lock.writeLock(fullPath, (release) => {
      if (extension === 'js') {
        FS.outputFile(fullPath, JSON.stringify(data), (error) => {
          if (error) return callback(error);
        });
      } else if (extension === 'yaml') {
        FS.outputFile(fullPath, YamlJS.safeDump(data), (error) => {
          if (error) return callback(error);
        });
      } else {
        return new Error('Invalid file type supported');
      }
      release();
    })
  }

  pathStorage(filePath, fileName, extension) {
    if(filePath && fileName && extension) {
      return AppRoot + '/' + filePath.replace(/\/+$/, "") + '/' + fileName + '.' + extension
    } else {
      return Error('Invalid file structure!!!');
    }
  }
}

module.exports = Data;
