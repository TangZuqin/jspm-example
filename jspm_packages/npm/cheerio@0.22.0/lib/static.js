/* */ 
var serialize = require('dom-serializer'),
    select = require('css-select'),
    parse = require('./parse'),
    _ = {
      merge: require('lodash.merge'),
      defaults: require('lodash.defaults')
    };
exports.load = function(content, options) {
  var Cheerio = require('./cheerio');
  options = _.defaults(options || {}, Cheerio.prototype.options);
  var root = parse(content, options);
  var initialize = function(selector, context, r, opts) {
    if (!(this instanceof initialize)) {
      return new initialize(selector, context, r, opts);
    }
    opts = _.defaults(opts || {}, options);
    return Cheerio.call(this, selector, context, r || root, opts);
  };
  initialize.prototype = Object.create(Cheerio.prototype);
  initialize.prototype.constructor = initialize;
  initialize.fn = initialize.prototype;
  initialize.prototype._originalRoot = root;
  _.merge(initialize, exports);
  initialize._root = root;
  initialize._options = options;
  return initialize;
};
function render(that, dom, options) {
  if (!dom) {
    if (that._root && that._root.children) {
      dom = that._root.children;
    } else {
      return '';
    }
  } else if (typeof dom === 'string') {
    dom = select(dom, that._root, options);
  }
  return serialize(dom, options);
}
exports.html = function(dom, options) {
  var Cheerio = require('./cheerio');
  if (Object.prototype.toString.call(dom) === '[object Object]' && !options && !('length' in dom) && !('type' in dom)) {
    options = dom;
    dom = undefined;
  }
  options = _.defaults(options || {}, this._options, Cheerio.prototype.options);
  return render(this, dom, options);
};
exports.xml = function(dom) {
  var options = _.defaults({xmlMode: true}, this._options);
  return render(this, dom, options);
};
exports.text = function(elems) {
  if (!elems) {
    elems = this.root();
  }
  var ret = '',
      len = elems.length,
      elem;
  for (var i = 0; i < len; i++) {
    elem = elems[i];
    if (elem.type === 'text')
      ret += elem.data;
    else if (elem.children && elem.type !== 'comment') {
      ret += exports.text(elem.children);
    }
  }
  return ret;
};
exports.parseHTML = function(data, context, keepScripts) {
  var parsed;
  if (!data || typeof data !== 'string') {
    return null;
  }
  if (typeof context === 'boolean') {
    keepScripts = context;
  }
  parsed = this.load(data);
  if (!keepScripts) {
    parsed('script').remove();
  }
  return parsed.root()[0].children.slice();
};
exports.root = function() {
  return this(this._root);
};
exports.contains = function(container, contained) {
  if (contained === container) {
    return false;
  }
  while (contained && contained !== contained.parent) {
    contained = contained.parent;
    if (contained === container) {
      return true;
    }
  }
  return false;
};
