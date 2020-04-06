module.exports = function() {
  require('jest-junit-reporter').apply(this, arguments)
  return require('jest-sonar-reporter').apply(this, arguments)
  // add any other processor you need
}
