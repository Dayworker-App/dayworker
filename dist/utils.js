"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;
exports.getInitials = getInitials;
exports.obMap = obMap;
exports.textToHexColor = textToHexColor;
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