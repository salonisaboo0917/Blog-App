const slugify = require('slugify');

module.exports = function (text) {
  return slugify(text, { lower: true, strict: true });
};
