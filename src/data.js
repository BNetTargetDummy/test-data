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

  get response() {
    return this._response;
  }

  set response(response) {
    this._response = response;
  }

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
          return data.store(result)
        })
        .catch(() => {
          new Error('Fetch Failed !!!')
        });
    });
  }

  readStorage(filePath, fileName, extension = 'yaml') {
    let fullPath =  AppRoot + '/' + filePath.replace(/\/+$/, "") + '/' + fileName + '.' + extension;
    let lock = new ReadWriteLock();
    lock.readLock(fullPath, (release) => {
      FS.access(fullPath, (error) => {
        if (error && error.code === 'ENOENT') {
          return null;
        } else {
          if (extension === 'js') {
            return JSON.parse(FS.readFileSync(fullPath, 'utf8'));
          } else if (extension === 'yaml') {
            return YamlJS.safeLoad(FS.readFileSync(fullPath, 'utf8'));
          } else {
            return new Error('Invalid file type supported');
          }
        }
      });
      release();
    })
  }

  writeStorage(data, filePath, fileName, extension = 'yaml', overwrite = true) {
    let fullPath = AppRoot + '/' + filePath.replace(/\/+$/, "") + '/' + fileName + '.' + extension;
    let lock = new ReadWriteLock();
    lock.writeLock(fullPath, (release) => {
      if (extension === 'js') {
        FS.outputFile(fullPath, JSON.stringify(data), (error) => {
          if (error) {
            console.error("write error:  " + error.message);
          } else {
            console.log("Successfully wrote to: " + fullPath);
          }
        });
      } else if (extension === 'yaml') {
        FS.outputFile(fullPath, YamlJS.safeDump(data), (error) => {
          if (error) {
            console.error("write error:  " + error.message);
          } else {
            console.log("Successfully wrote to: " + fullPath);
          }
        });
      } else {
        return new Error('Invalid file type supported');
      }
      release();
    })
  }
}

module.exports = Data;
