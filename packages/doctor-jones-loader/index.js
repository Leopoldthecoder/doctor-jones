const dj = require('doctor-jones')

const getReplacer = quote => (match, p1) => {
  return isPath(p1) ? match : `${quote}${dj(p1)}${quote}`
}
const isPath = string =>
  /^((\.\.\/)*|((\.)?\/))([^/\s]+\/)+[^/\s]*$/.test(string)

module.exports = function(source) {
  return source
    .replace(/'(.+)'/g, getReplacer("'"))
    .replace(/"(.+)"/g, getReplacer('"'))
    .replace(/`(.+)`/g, getReplacer('`'))
}
