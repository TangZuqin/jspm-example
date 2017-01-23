/* */ 
var DomUtils = require('domutils'),
    isTag = DomUtils.isTag,
    getText = DomUtils.getText,
    getParent = DomUtils.getParent,
    getChildren = DomUtils.getChildren,
    getSiblings = DomUtils.getSiblings,
    hasAttrib = DomUtils.hasAttrib,
    getName = DomUtils.getName,
    getAttribute = DomUtils.getAttributeValue,
    getNCheck = require('nth-check'),
    checkAttrib = require('./attributes').rules.equals,
    BaseFuncs = require('boolbase'),
    trueFunc = BaseFuncs.trueFunc,
    falseFunc = BaseFuncs.falseFunc;
function getFirstElement(elems) {
  for (var i = 0; elems && i < elems.length; i++) {
    if (isTag(elems[i]))
      return elems[i];
  }
}
function getAttribFunc(name, value) {
  var data = {
    name: name,
    value: value
  };
  return function attribFunc(next) {
    return checkAttrib(next, data);
  };
}
function getChildFunc(next) {
  return function(elem) {
    return !!getParent(elem) && next(elem);
  };
}
var filters = {
  contains: function(next, text) {
    return function contains(elem) {
      return next(elem) && getText(elem).indexOf(text) >= 0;
    };
  },
  icontains: function(next, text) {
    var itext = text.toLowerCase();
    return function icontains(elem) {
      return next(elem) && getText(elem).toLowerCase().indexOf(itext) >= 0;
    };
  },
  "nth-child": function(next, rule) {
    var func = getNCheck(rule);
    if (func === falseFunc)
      return func;
    if (func === trueFunc)
      return getChildFunc(next);
    return function nthChild(elem) {
      var siblings = getSiblings(elem);
      for (var i = 0,
          pos = 0; i < siblings.length; i++) {
        if (isTag(siblings[i])) {
          if (siblings[i] === elem)
            break;
          else
            pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-child": function(next, rule) {
    var func = getNCheck(rule);
    if (func === falseFunc)
      return func;
    if (func === trueFunc)
      return getChildFunc(next);
    return function nthLastChild(elem) {
      var siblings = getSiblings(elem);
      for (var pos = 0,
          i = siblings.length - 1; i >= 0; i--) {
        if (isTag(siblings[i])) {
          if (siblings[i] === elem)
            break;
          else
            pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-of-type": function(next, rule) {
    var func = getNCheck(rule);
    if (func === falseFunc)
      return func;
    if (func === trueFunc)
      return getChildFunc(next);
    return function nthOfType(elem) {
      var siblings = getSiblings(elem);
      for (var pos = 0,
          i = 0; i < siblings.length; i++) {
        if (isTag(siblings[i])) {
          if (siblings[i] === elem)
            break;
          if (getName(siblings[i]) === getName(elem))
            pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-of-type": function(next, rule) {
    var func = getNCheck(rule);
    if (func === falseFunc)
      return func;
    if (func === trueFunc)
      return getChildFunc(next);
    return function nthLastOfType(elem) {
      var siblings = getSiblings(elem);
      for (var pos = 0,
          i = siblings.length - 1; i >= 0; i--) {
        if (isTag(siblings[i])) {
          if (siblings[i] === elem)
            break;
          if (getName(siblings[i]) === getName(elem))
            pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  root: function(next) {
    return function(elem) {
      return !getParent(elem) && next(elem);
    };
  },
  scope: function(next, rule, options, context) {
    if (!context || context.length === 0) {
      return filters.root(next);
    }
    if (context.length === 1) {
      return function(elem) {
        return context[0] === elem && next(elem);
      };
    }
    return function(elem) {
      return context.indexOf(elem) >= 0 && next(elem);
    };
  },
  checkbox: getAttribFunc("type", "checkbox"),
  file: getAttribFunc("type", "file"),
  password: getAttribFunc("type", "password"),
  radio: getAttribFunc("type", "radio"),
  reset: getAttribFunc("type", "reset"),
  image: getAttribFunc("type", "image"),
  submit: getAttribFunc("type", "submit")
};
var pseudos = {
  empty: function(elem) {
    return !getChildren(elem).some(function(elem) {
      return isTag(elem) || elem.type === "text";
    });
  },
  "first-child": function(elem) {
    return getFirstElement(getSiblings(elem)) === elem;
  },
  "last-child": function(elem) {
    var siblings = getSiblings(elem);
    for (var i = siblings.length - 1; i >= 0; i--) {
      if (siblings[i] === elem)
        return true;
      if (isTag(siblings[i]))
        break;
    }
    return false;
  },
  "first-of-type": function(elem) {
    var siblings = getSiblings(elem);
    for (var i = 0; i < siblings.length; i++) {
      if (isTag(siblings[i])) {
        if (siblings[i] === elem)
          return true;
        if (getName(siblings[i]) === getName(elem))
          break;
      }
    }
    return false;
  },
  "last-of-type": function(elem) {
    var siblings = getSiblings(elem);
    for (var i = siblings.length - 1; i >= 0; i--) {
      if (isTag(siblings[i])) {
        if (siblings[i] === elem)
          return true;
        if (getName(siblings[i]) === getName(elem))
          break;
      }
    }
    return false;
  },
  "only-of-type": function(elem) {
    var siblings = getSiblings(elem);
    for (var i = 0,
        j = siblings.length; i < j; i++) {
      if (isTag(siblings[i])) {
        if (siblings[i] === elem)
          continue;
        if (getName(siblings[i]) === getName(elem))
          return false;
      }
    }
    return true;
  },
  "only-child": function(elem) {
    var siblings = getSiblings(elem);
    for (var i = 0; i < siblings.length; i++) {
      if (isTag(siblings[i]) && siblings[i] !== elem)
        return false;
    }
    return true;
  },
  link: function(elem) {
    return hasAttrib(elem, "href");
  },
  visited: falseFunc,
  selected: function(elem) {
    if (hasAttrib(elem, "selected"))
      return true;
    else if (getName(elem) !== "option")
      return false;
    var parent = getParent(elem);
    if (!parent || getName(parent) !== "select" || hasAttrib(parent, "multiple"))
      return false;
    var siblings = getChildren(parent),
        sawElem = false;
    for (var i = 0; i < siblings.length; i++) {
      if (isTag(siblings[i])) {
        if (siblings[i] === elem) {
          sawElem = true;
        } else if (!sawElem) {
          return false;
        } else if (hasAttrib(siblings[i], "selected")) {
          return false;
        }
      }
    }
    return sawElem;
  },
  disabled: function(elem) {
    return hasAttrib(elem, "disabled");
  },
  enabled: function(elem) {
    return !hasAttrib(elem, "disabled");
  },
  checked: function(elem) {
    return hasAttrib(elem, "checked") || pseudos.selected(elem);
  },
  required: function(elem) {
    return hasAttrib(elem, "required");
  },
  optional: function(elem) {
    return !hasAttrib(elem, "required");
  },
  parent: function(elem) {
    return !pseudos.empty(elem);
  },
  header: function(elem) {
    var name = getName(elem);
    return name === "h1" || name === "h2" || name === "h3" || name === "h4" || name === "h5" || name === "h6";
  },
  button: function(elem) {
    var name = getName(elem);
    return name === "button" || name === "input" && getAttribute(elem, "type") === "button";
  },
  input: function(elem) {
    var name = getName(elem);
    return name === "input" || name === "textarea" || name === "select" || name === "button";
  },
  text: function(elem) {
    var attr;
    return getName(elem) === "input" && (!(attr = getAttribute(elem, "type")) || attr.toLowerCase() === "text");
  }
};
function verifyArgs(func, name, subselect) {
  if (subselect === null) {
    if (func.length > 1 && name !== "scope") {
      throw new SyntaxError("pseudo-selector :" + name + " requires an argument");
    }
  } else {
    if (func.length === 1) {
      throw new SyntaxError("pseudo-selector :" + name + " doesn't have any arguments");
    }
  }
}
var re_CSS3 = /^(?:(?:nth|last|first|only)-(?:child|of-type)|root|empty|(?:en|dis)abled|checked|not)$/;
module.exports = {
  compile: function(next, data, options, context) {
    var name = data.name,
        subselect = data.data;
    if (options && options.strict && !re_CSS3.test(name)) {
      throw SyntaxError(":" + name + " isn't part of CSS3");
    }
    if (typeof filters[name] === "function") {
      verifyArgs(filters[name], name, subselect);
      return filters[name](next, subselect, options, context);
    } else if (typeof pseudos[name] === "function") {
      var func = pseudos[name];
      verifyArgs(func, name, subselect);
      if (next === trueFunc)
        return func;
      return function pseudoArgs(elem) {
        return func(elem, subselect) && next(elem);
      };
    } else {
      throw new SyntaxError("unmatched pseudo-class :" + name);
    }
  },
  filters: filters,
  pseudos: pseudos
};
