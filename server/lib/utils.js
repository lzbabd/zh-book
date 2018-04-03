const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * 读取文件
   */
  readFile(filename) {
    let _path = path.join(__dirname, '../mock', filename);
    return new Promise((resolve, reject) => {
      fs.readFile(_path, 'utf-8', (err, val) => {
        if (err) return reject(err.message)
        resolve(JSON.parse(val))
      })
    })
  },
  writeFile(filename, data) {
    let _path = path.join(__dirname, '../mock', filename);
    data = typeof data === 'string' ? data : JSON.stringify(data)
    return new Promise((resolve, reject) => {
      fs.writeFile(_path, data, 'utf-8', err => {
        if (err) return reject(err.message)
        resolve()
      })
    })
  }
}
