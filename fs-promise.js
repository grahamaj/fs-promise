const _ = require("lodash");
const fs = require("fs");
const util = require("util");

var fsp = {};

function promisifyFs (val, key) {
  if (key === "exists") return; // exists is deprecated so we won't forward it
  if (_.isFunction(val) && !_.endsWith(key, "Sync"))
    fsp[key] = util.promisify(val); // promisify all non-Sync functions
  else fsp[key] = val; // forward everything else
}

_.forEach(fs, promisifyFs);

module.exports = fsp;
