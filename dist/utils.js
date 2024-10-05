"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchParams = SearchParams;
exports.checkTranslated = void 0;
exports.clean = clean;
exports.convertAuthErrorCodeToLangKey = void 0;
exports.getInitials = getInitials;
exports.matchesAuthErrorCode = exports.invalidateSignUpInput = exports.invalidateSignUpCredentials = void 0;
exports.obMap = obMap;
exports.stripHTML = exports.processAuthError = void 0;
exports.textToHexColor = textToHexColor;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function obMap(ob, callback) {
  if (!ob) return;
  return Object.keys(ob).map(function (key) {
    return callback(ob[key], key);
  });
}
function getInitials(name) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var parts = name.trim().toUpperCase().split(/\s{1,}/g).map(function (p) {
    return p[0];
  });
  if (parts.length > limit && limit == 2) parts = [parts[0], parts[parts.length - 1]];
  return parts.join(sep);
}
function clean(name) {
  var cleaned = name.replace(/\@[^\.]{1,}\.[a-z]{2,}/gi, '').replace(/[^a-z\-\. ]/gi, '');
  cleaned = (cleaned.split(/\s{1,}/g).map(function (part, index) {
    if (!index) return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    return part.charAt(0).toUpperCase();
  }).join('. ').trim() + '.').replace(/\.{2,}$/g, '.');
  if (cleaned.indexOf(' ') == -1 && cleaned.match(/\.$/g)) cleaned = cleaned.replace(/\.$/g, '');
  return cleaned;
}
function textToHexColor(str) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  str = str.replace(/[^a-z]{1,}/gi, '');
  if (!opacity && str.length > 2) str = str.substring(0, 2);
  if (!opacity && str.length > 3) str = str.substring(0, 3);
  if (opacity && str.length > 4) str = str.substring(0, 4);
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var _hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(_hex);
  }
  if (arr1.length == 2 && !opacity) arr1[1] = arr1[1][0];
  var hex = "#".concat(arr1.join(''));
  return hex;
}
function SearchParams(data) {
  var _this = this;
  this.data = data || {};
  this.size = Object.keys(data).length;
  this.get = function (key) {
    return _this.data[key];
  };
  this.set = function (key, value) {
    _this.data[key] = value;
  };
  this.has = function (key) {
    return _this.data[key] !== undefined;
  };
  this["delete"] = function (key) {
    delete _this.data[key];
  };
  this.toString = function () {
    var str = '';
    for (var key in _this.data) {
      str += "".concat(key, "=").concat(_this.data[key], "&");
    }
    return str.substring(0, str.length - 1);
  };
  this.entries = function () {
    return Object.entries(_this.data);
  };
  this.keys = function () {
    return Object.keys(_this.data);
  };
  this.values = function () {
    return Object.values(_this.data);
  };
  this.append = function (key, value) {
    if (_this.data[key] === undefined) {
      _this.data[key] = value;
    } else {
      _this.data[key] = [_this.data[key], value];
    }
  };
  this.getAll = function (key) {
    return _this.data[key];
  };
  this.sort = function () {
    var keys = Object.keys(_this.data).sort();
    var sorted = {};
    keys.forEach(function (key) {
      sorted[key] = _this.data[key];
    });
    _this.data = sorted;
  };
  this.forEach = function (callback) {
    for (var key in _this.data) {
      callback(_this.data[key], key);
    }
  };
}
var invalidateSignUpCredentials = exports.invalidateSignUpCredentials = function invalidateSignUpCredentials(email, password, reject) {
  if (!email.match(/^[^\@]{1,}\@[^\.]{1,}\.[a-z]{2,}$/gi)) return reject("Email in wrong format");
  if (password.length < 5) return reject("Password too short");
  return false;
};
var invalidateSignUpInput = exports.invalidateSignUpInput = function invalidateSignUpInput(input, reject) {
  if (_typeof(input) !== "object") return reject("Input format incorrect");
  return false;
};
var stripHTML = exports.stripHTML = function stripHTML(html) {
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};
var convertAuthErrorCodeToLangKey = exports.convertAuthErrorCodeToLangKey = function convertAuthErrorCodeToLangKey(code) {
  return code.replace(/^auth\//, 'ux.error.auth.').replace(/\-([a-z])/g, function (m, a) {
    return a.toUpperCase();
  });
};
var matchesAuthErrorCode = exports.matchesAuthErrorCode = function matchesAuthErrorCode(code) {
  return !!code.match(/^auth\/[a-z\-]{1,}$/, code);
};
var processAuthError = exports.processAuthError = function processAuthError(error) {
  var message = error.message,
    code = error.code;
  // console.log(code, message)
  var response = {
    origMessage: message,
    code: code
  };
  if (!code || code == '') return _objectSpread(_objectSpread({}, response), {}, {
    message: 'ux.error.auth.unknownErrorOccured'
  });
  if (!matchesAuthErrorCode(code)) return _objectSpread(_objectSpread({}, response), {}, {
    message: 'ux.error.auth.unknownErrorOccured'
  });
  return _objectSpread(_objectSpread({}, response), {}, {
    message: convertAuthErrorCodeToLangKey(code)
  });
};
var checkTranslated = exports.checkTranslated = function checkTranslated(t, key) {
  if (typeof t !== 'function') return undefined;
  if (typeof key != 'string') return undefined;
  var translated = t(key.trim());
  if (key.trim() == translated.trim()) return false;
  return true;
};