/* */ 
(function(process) {
  var FUNC_ERROR_TEXT = 'Expected a function';
  var PLACEHOLDER = '__lodash_placeholder__';
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128,
      REARG_FLAG = 256,
      FLIP_FLAG = 512;
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;
  var wrapFlags = [['ary', ARY_FLAG], ['bind', BIND_FLAG], ['bindKey', BIND_KEY_FLAG], ['curry', CURRY_FLAG], ['curryRight', CURRY_RIGHT_FLAG], ['flip', FLIP_FLAG], ['partial', PARTIAL_FLAG], ['partialRight', PARTIAL_RIGHT_FLAG], ['rearg', REARG_FLAG]];
  var funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      symbolTag = '[object Symbol]';
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reTrim = /^\s+|\s+$/g;
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsOctal = /^0o[0-7]+$/i;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var freeParseInt = parseInt;
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function('return this')();
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  function arrayIncludes(array, value) {
    var length = array ? array.length : 0;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);
    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  function baseIsNaN(value) {
    return value !== value;
  }
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;
    while (length--) {
      if (array[length] === placeholder) {
        result++;
      }
    }
    return result;
  }
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];
    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }
  var funcProto = Function.prototype,
      objectProto = Object.prototype;
  var coreJsData = root['__core-js_shared__'];
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  var objectCreate = Object.create;
  var nativeMax = Math.max,
      nativeMin = Math.min;
  var defineProperty = (function() {
    var func = getNative(Object, 'defineProperty'),
        name = getNative.name;
    return (name && name.length > 2) ? func : undefined;
  }());
  function baseCreate(proto) {
    return isObject(proto) ? objectCreate(proto) : {};
  }
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseRest(func, start) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }
  function composeArgs(args, partials, holders, isCurried) {
    var argsIndex = -1,
        argsLength = args.length,
        holdersLength = holders.length,
        leftIndex = -1,
        leftLength = partials.length,
        rangeLength = nativeMax(argsLength - holdersLength, 0),
        result = Array(leftLength + rangeLength),
        isUncurried = !isCurried;
    while (++leftIndex < leftLength) {
      result[leftIndex] = partials[leftIndex];
    }
    while (++argsIndex < holdersLength) {
      if (isUncurried || argsIndex < argsLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
    }
    while (rangeLength--) {
      result[leftIndex++] = args[argsIndex++];
    }
    return result;
  }
  function composeArgsRight(args, partials, holders, isCurried) {
    var argsIndex = -1,
        argsLength = args.length,
        holdersIndex = -1,
        holdersLength = holders.length,
        rightIndex = -1,
        rightLength = partials.length,
        rangeLength = nativeMax(argsLength - holdersLength, 0),
        result = Array(rangeLength + rightLength),
        isUncurried = !isCurried;
    while (++argsIndex < rangeLength) {
      result[argsIndex] = args[argsIndex];
    }
    var offset = argsIndex;
    while (++rightIndex < rightLength) {
      result[offset + rightIndex] = partials[rightIndex];
    }
    while (++holdersIndex < holdersLength) {
      if (isUncurried || argsIndex < argsLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
    }
    return result;
  }
  function copyArray(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  function createBind(func, bitmask, thisArg) {
    var isBind = bitmask & BIND_FLAG,
        Ctor = createCtor(func);
    function wrapper() {
      var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(isBind ? thisArg : this, arguments);
    }
    return wrapper;
  }
  function createCtor(Ctor) {
    return function() {
      var args = arguments;
      switch (args.length) {
        case 0:
          return new Ctor;
        case 1:
          return new Ctor(args[0]);
        case 2:
          return new Ctor(args[0], args[1]);
        case 3:
          return new Ctor(args[0], args[1], args[2]);
        case 4:
          return new Ctor(args[0], args[1], args[2], args[3]);
        case 5:
          return new Ctor(args[0], args[1], args[2], args[3], args[4]);
        case 6:
          return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7:
          return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      }
      var thisBinding = baseCreate(Ctor.prototype),
          result = Ctor.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    };
  }
  function createCurry(func, bitmask, arity) {
    var Ctor = createCtor(func);
    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length,
          placeholder = getHolder(wrapper);
      while (index--) {
        args[index] = arguments[index];
      }
      var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder) ? [] : replaceHolders(args, placeholder);
      length -= holders.length;
      if (length < arity) {
        return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
      }
      var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
      return apply(fn, this, args);
    }
    return wrapper;
  }
  function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & ARY_FLAG,
        isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
        isFlip = bitmask & FLIP_FLAG,
        Ctor = isBindKey ? undefined : createCtor(func);
    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length;
      while (index--) {
        args[index] = arguments[index];
      }
      if (isCurried) {
        var placeholder = getHolder(wrapper),
            holdersCount = countHolders(args, placeholder);
      }
      if (partials) {
        args = composeArgs(args, partials, holders, isCurried);
      }
      if (partialsRight) {
        args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
      }
      length -= holdersCount;
      if (isCurried && length < arity) {
        var newHolders = replaceHolders(args, placeholder);
        return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
      }
      var thisBinding = isBind ? thisArg : this,
          fn = isBindKey ? thisBinding[func] : func;
      length = args.length;
      if (argPos) {
        args = reorder(args, argPos);
      } else if (isFlip && length > 1) {
        args.reverse();
      }
      if (isAry && ary < length) {
        args.length = ary;
      }
      if (this && this !== root && this instanceof wrapper) {
        fn = Ctor || createCtor(fn);
      }
      return fn.apply(thisBinding, args);
    }
    return wrapper;
  }
  function createPartial(func, bitmask, thisArg, partials) {
    var isBind = bitmask & BIND_FLAG,
        Ctor = createCtor(func);
    function wrapper() {
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(leftLength + argsLength),
          fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      return apply(fn, isBind ? thisArg : this, args);
    }
    return wrapper;
  }
  function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
    var isCurry = bitmask & CURRY_FLAG,
        newHolders = isCurry ? holders : undefined,
        newHoldersRight = isCurry ? undefined : holders,
        newPartials = isCurry ? partials : undefined,
        newPartialsRight = isCurry ? undefined : partials;
    bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
    bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
    if (!(bitmask & CURRY_BOUND_FLAG)) {
      bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
    }
    var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
    result.placeholder = placeholder;
    return setWrapToString(result, func, bitmask);
  }
  function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
      partials = holders = undefined;
    }
    ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
    arity = arity === undefined ? arity : toInteger(arity);
    length -= holders ? holders.length : 0;
    if (bitmask & PARTIAL_RIGHT_FLAG) {
      var partialsRight = partials,
          holdersRight = holders;
      partials = holders = undefined;
    }
    var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
    func = newData[0];
    bitmask = newData[1];
    thisArg = newData[2];
    partials = newData[3];
    holders = newData[4];
    arity = newData[9] = newData[9] == null ? (isBindKey ? 0 : func.length) : nativeMax(newData[9] - length, 0);
    if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
      bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
    }
    if (!bitmask || bitmask == BIND_FLAG) {
      var result = createBind(func, bitmask, thisArg);
    } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
      result = createCurry(func, bitmask, arity);
    } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
      result = createPartial(func, bitmask, thisArg, partials);
    } else {
      result = createHybrid.apply(undefined, newData);
    }
    return setWrapToString(result, func, bitmask);
  }
  function getHolder(func) {
    var object = func;
    return object.placeholder;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }
  function getWrapDetails(source) {
    var match = source.match(reWrapDetails);
    return match ? match[1].split(reSplitDetails) : [];
  }
  function insertWrapDetails(source, details) {
    var length = details.length,
        lastIndex = length - 1;
    details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
    details = details.join(length > 2 ? ', ' : ' ');
    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }
  function reorder(array, indexes) {
    var arrLength = array.length,
        length = nativeMin(indexes.length, arrLength),
        oldArray = copyArray(array);
    while (length--) {
      var index = indexes[length];
      array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
  }
  var setWrapToString = !defineProperty ? identity : function(wrapper, reference, bitmask) {
    var source = (reference + '');
    return defineProperty(wrapper, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
    });
  };
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }
  function updateWrapDetails(details, bitmask) {
    arrayEach(wrapFlags, function(pair) {
      var value = '_.' + pair[0];
      if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
        details.push(value);
      }
    });
    return details.sort();
  }
  var bind = baseRest(function(func, thisArg, partials) {
    var bitmask = BIND_FLAG;
    if (partials.length) {
      var holders = replaceHolders(partials, getHolder(bind));
      bitmask |= PARTIAL_FLAG;
    }
    return createWrap(func, bitmask, thisArg, partials, holders);
  });
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  function isSymbol(value) {
    return typeof value == 'symbol' || (isObjectLike(value) && objectToString.call(value) == symbolTag);
  }
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;
    return result === result ? (remainder ? result - remainder : result) : 0;
  }
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value)) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : (reIsBadHex.test(value) ? NAN : +value);
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  function identity(value) {
    return value;
  }
  bind.placeholder = {};
  module.exports = bind;
})(require('process'));
