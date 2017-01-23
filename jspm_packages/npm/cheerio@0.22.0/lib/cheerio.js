/* */ 
var parse = require('./parse'),
    isHtml = require('./utils').isHtml,
    _ = {
      extend: require('lodash.assignin'),
      bind: require('lodash.bind'),
      forEach: require('lodash.foreach'),
      defaults: require('lodash.defaults')
    };
var api = [require('./api/attributes'), require('./api/traversing'), require('./api/manipulation'), require('./api/css'), require('./api/forms')];
var Cheerio = module.exports = function(selector, context, root, options) {
  if (!(this instanceof Cheerio))
    return new Cheerio(selector, context, root, options);
  this.options = _.defaults(options || {}, this.options);
  if (!selector)
    return this;
  if (root) {
    if (typeof root === 'string')
      root = parse(root, this.options);
    this._root = Cheerio.call(this, root);
  }
  if (selector.cheerio)
    return selector;
  if (isNode(selector))
    selector = [selector];
  if (Array.isArray(selector)) {
    _.forEach(selector, _.bind(function(elem, idx) {
      this[idx] = elem;
    }, this));
    this.length = selector.length;
    return this;
  }
  if (typeof selector === 'string' && isHtml(selector)) {
    return Cheerio.call(this, parse(selector, this.options).children);
  }
  if (!context) {
    context = this._root;
  } else if (typeof context === 'string') {
    if (isHtml(context)) {
      context = parse(context, this.options);
      context = Cheerio.call(this, context);
    } else {
      selector = [context, selector].join(' ');
      context = this._root;
    }
  } else if (!context.cheerio) {
    context = Cheerio.call(this, context);
  }
  if (!context)
    return this;
  return context.find(selector);
};
_.extend(Cheerio, require('./static'));
Cheerio.prototype.cheerio = '[cheerio object]';
Cheerio.prototype.options = {
  withDomLvl1: true,
  normalizeWhitespace: false,
  xmlMode: false,
  decodeEntities: true
};
Cheerio.prototype.length = 0;
Cheerio.prototype.splice = Array.prototype.splice;
Cheerio.prototype._make = function(dom, context) {
  var cheerio = new this.constructor(dom, context, this._root, this.options);
  cheerio.prevObject = this;
  return cheerio;
};
Cheerio.prototype.toArray = function() {
  return this.get();
};
api.forEach(function(mod) {
  _.extend(Cheerio.prototype, mod);
});
var isNode = function(obj) {
  return obj.name || obj.type === 'text' || obj.type === 'comment';
};
