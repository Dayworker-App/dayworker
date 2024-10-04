"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchParams = void 0;
exports.clean = clean;
exports.getInitials = getInitials;
exports.obMap = obMap;
exports.textToHexColor = textToHexColor;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
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
var SearchParams = exports.SearchParams = /*#__PURE__*/_createClass(function SearchParams(data) {
  var _this = this;
  _classCallCheck(this, SearchParams);
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
  this.toString = function () {
    var str = '';
    for (var key in _this.data) {
      str += "".concat(key, "=").concat(_this.data[key], "&");
    }
    return str.substring(0, str.length - 1);
  };
});