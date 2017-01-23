/* */ 
var parse = require('./parse'),
    render = require('dom-serializer');
var tags = {
  tag: true,
  script: true,
  style: true
};
exports.isTag = function(type) {
  if (type.type)
    type = type.type;
  return tags[type] || false;
};
exports.camelCase = function(str) {
  return str.replace(/[_.-](\w|$)/g, function(_, x) {
    return x.toUpperCase();
  });
};
exports.cssCase = function(str) {
  return str.replace(/[A-Z]/g, '-$&').toLowerCase();
};
exports.domEach = function(cheerio, fn) {
  var i = 0,
      len = cheerio.length;
  while (i < len && fn.call(cheerio, i, cheerio[i]) !== false)
    ++i;
  return cheerio;
};
exports.cloneDom = function(dom, options) {
  return parse(render(dom, options), options).children;
};
var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
exports.isHtml = function(str) {
  if (str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3)
    return true;
  var match = quickExpr.exec(str);
  return !!(match && match[1]);
};
