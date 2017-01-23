System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "app/build.js": [
      "app/main.js",
      "app/fruit.js",
      "npm:jquery@3.1.1.js",
      "npm:jquery@3.1.1/dist/jquery.js"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "browser": "npm:browser@0.2.6",
    "components/jquery": "github:components/jquery@3.1.1",
    "core-js": "npm:core-js@1.2.7",
    "jquery": "npm:jquery@3.1.1",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browser@0.2.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cheerio": "npm:cheerio@0.22.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "junjo": "npm:junjo@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "termcolor": "npm:termcolor@0.2.0",
      "u2r": "npm:u2r@0.1.3",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cheerio@0.22.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "css-select": "npm:css-select@1.2.0",
      "dom-serializer": "npm:dom-serializer@0.1.0",
      "entities": "npm:entities@1.1.1",
      "htmlparser2": "npm:htmlparser2@3.9.2",
      "lodash.assignin": "npm:lodash.assignin@4.2.0",
      "lodash.bind": "npm:lodash.bind@4.2.1",
      "lodash.defaults": "npm:lodash.defaults@4.2.0",
      "lodash.filter": "npm:lodash.filter@4.6.0",
      "lodash.flatten": "npm:lodash.flatten@4.4.0",
      "lodash.foreach": "npm:lodash.foreach@4.5.0",
      "lodash.map": "npm:lodash.map@4.6.0",
      "lodash.merge": "npm:lodash.merge@4.6.0",
      "lodash.pick": "npm:lodash.pick@4.4.0",
      "lodash.reduce": "npm:lodash.reduce@4.6.0",
      "lodash.reject": "npm:lodash.reject@4.6.0",
      "lodash.some": "npm:lodash.some@4.6.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:css-select@1.2.0": {
      "boolbase": "npm:boolbase@1.0.0",
      "css-what": "npm:css-what@2.1.0",
      "domutils": "npm:domutils@1.5.1",
      "nth-check": "npm:nth-check@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:dom-serializer@0.1.0": {
      "domelementtype": "npm:domelementtype@1.1.3",
      "entities": "npm:entities@1.1.1"
    },
    "npm:domhandler@2.3.0": {
      "domelementtype": "npm:domelementtype@1.3.0"
    },
    "npm:domutils@1.5.1": {
      "dom-serializer": "npm:dom-serializer@0.1.0",
      "domelementtype": "npm:domelementtype@1.3.0"
    },
    "npm:entities@1.1.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:htmlparser2@3.9.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "domelementtype": "npm:domelementtype@1.3.0",
      "domhandler": "npm:domhandler@2.3.0",
      "domutils": "npm:domutils@1.5.1",
      "entities": "npm:entities@1.1.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:junjo@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.bind@4.2.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.filter@4.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.map@4.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.merge@4.6.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.reduce@4.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.reject@4.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.some@4.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:nth-check@1.0.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "boolbase": "npm:boolbase@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:termcolor@0.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:u2r@0.1.3": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
