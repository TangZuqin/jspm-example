/* */ 
var parse = require('./parse'),
    compile = require('./compile');
module.exports = function nthCheck(formula) {
  return compile(parse(formula));
};
module.exports.parse = parse;
module.exports.compile = compile;
