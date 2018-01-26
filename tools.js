const path = require('path');
const fs = require('fs');

/**
 * Scans dir recursively with filename filtering
 * @param string dir
 * @param string filter
 */
exports.scanDir = (dir, filter) => {
  let results = [];
  let fullpath = path.resolve(dir);

  let files = fs.readdirSync(dir);

  for (let file of files) {
    let filepath = path.resolve(fullpath, file);

    if (fs.statSync(filepath).isDirectory()) {
      results = results.concat(this.scanDir(filepath));
      continue;
    }

    if (filter && !file.match(filter)) continue;

    results.push(filepath);
  }

  return results;
};