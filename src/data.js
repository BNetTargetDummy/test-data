const AppRoot = require('app-root-path');
const Async = require('async');
const FS = require('fs-extra');
const Glob = require('glob');
const Path = require('path');
const YamlJS = require('js-yaml');

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
    Async.eachSeries(this.scoped(scoped), (data, next) => {
      console.log(data);
      data.request()
        .then(result => {
          return data.process([], result)
        })
        .then(result => {
          console.log(result.length);
          return data.store(result);

        })
        .catch(error => next(error));
        next();
    });
  }

  readStorage(filePath, fileName, extension) {
    let data  = FS.readFileSync(this.pathStorage(filePath, fileName, extension), 'utf8');
    console.log(this.constructor.name + ' read from file: ' + this.pathStorage(filePath, fileName, extension));
    if (extension === 'js') {
      return JSON.parse(data);
    } else if (extension === 'yaml') {
      return YamlJS.safeLoad(data);
    }
    return callback(Error('Invalid file type supported'));
  }

  writeStorage(data, filePath, fileName, extension, overwrite = true) {
      if (extension === 'js') {
        FS.outputFileSync(this.pathStorage(filePath, fileName, extension), JSON.stringify(data));
      } else if (extension === 'yaml') {
        FS.outputFileSync(this.pathStorage(filePath, fileName, extension), YamlJS.safeDump(data));
      } else {
        return Error('Invalid file type supported');
      }
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
