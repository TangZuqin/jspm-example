/* */ 
(function(Buffer) {
  var htmlparser = require('htmlparser2');
  exports = module.exports = function(content, options) {
    var dom = exports.evaluate(content, options),
        root = exports.evaluate('<root></root>', options)[0];
    root.type = 'root';
    exports.update(dom, root);
    return root;
  };
  exports.evaluate = function(content, options) {
    var dom;
    if (typeof content === 'string' || Buffer.isBuffer(content)) {
      dom = htmlparser.parseDOM(content, options);
    } else {
      dom = content;
    }
    return dom;
  };
  exports.update = function(arr, parent) {
    if (!Array.isArray(arr))
      arr = [arr];
    if (parent) {
      parent.children = arr;
    } else {
      parent = null;
    }
    for (var i = 0; i < arr.length; i++) {
      var node = arr[i];
      var oldParent = node.parent || node.root,
          oldSiblings = oldParent && oldParent.children;
      if (oldSiblings && oldSiblings !== arr) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
        if (node.prev) {
          node.prev.next = node.next;
        }
        if (node.next) {
          node.next.prev = node.prev;
        }
      }
      if (parent) {
        node.prev = arr[i - 1] || null;
        node.next = arr[i + 1] || null;
      } else {
        node.prev = node.next = null;
      }
      if (parent && parent.type === 'root') {
        node.root = parent;
        node.parent = null;
      } else {
        node.root = null;
        node.parent = parent;
      }
    }
    return parent;
  };
})(require('buffer').Buffer);
