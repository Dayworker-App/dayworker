"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDayworker = exports.DayworkerProvider = exports.DayworkerContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _app = require("firebase/app");
var _auth = require("firebase/auth");
var geofire = _interopRequireWildcard(require("geofire-common"));
var utils = _interopRequireWildcard(require("./utils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**

// Context Provider Useage:

import { DayworkerContext, dayworkerProvider } from 'dayworker';
const DayworkerProvider = ({children}) => {
    const value = dayworkerProvider();
    return <DayworkerContext.Provider value={value}>{children}</DayworkerContext.Provider>
}

<DayworkerProvider>{children}</DayworkerProvider>

*/
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
var googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
};
var env = process.env.NODE_ENV;
// if (env === 'production') env = '(default)';
if (env === 'production') env = 'development';
var app = !(0, _app.getApps)().length ? (0, _app.initializeApp)(firebaseConfig) : (0, _app.getApps)()[0];
var auth = (0, _auth.getAuth)(app);
var db = (0, _firestore.getFirestore)(app, env);
var defaultDB = env != '(default)' ? (0, _firestore.getFirestore)(app, '(default)') : db;
var storage = (0, _storage.getStorage)(app);
var cache = new Map();
var signOut = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", auth.signOut());
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function signOut() {
    return _ref.apply(this, arguments);
  };
}();
var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(email, password) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _auth.signInWithEmailAndPassword)(auth, email.toLowerCase().trim(), password.trim()));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function signIn(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var sendUpdatePasswordEmail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(email) {
    var emailClean, query, domain, actionCodeSettings;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          emailClean = email.trim().toLowerCase();
          query = new URLSearchParams({
            email: emailClean
          });
          domain = window.location.protocol + '//' + window.location.host;
          actionCodeSettings = {
            url: "".concat(domain, "/user/signin/?").concat(query.toString()),
            /* iOS: {
               bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            }, */
            handleCodeInApp: true
          };
          return _context3.abrupt("return", (0, _auth.sendPasswordResetEmail)(auth, emailClean, actionCodeSettings));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function sendUpdatePasswordEmail(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var invalidateSignUpCredentials = function invalidateSignUpCredentials(email, password, reject) {
  if (!email.match(/^[^\@]{1,}\@[^\.]{1,}\.[a-z]{2,}$/gi)) return reject("Email in wrong format");
  if (password.length < 5) return reject("Password too short");
  return false;
};
var invalidateSignUpInput = function invalidateSignUpInput(input, reject) {
  if (_typeof(input) !== "object") return reject("Input format incorrect");
  return false;
};
var uploadFileBase64 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(base64, path, format) {
    var storageRef;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          format = format || 'data_url'; // 'base64' 'base64url' 'data_url'
          // const storage = getStorage(app);
          storageRef = (0, _storage.ref)(storage, path);
          return _context4.abrupt("return", (0, _storage.uploadString)(storageRef, base64, format));
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function uploadFileBase64(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var updateProfileImage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(uid, base64) {
    var path;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          // Check if uid exists
          path = "".concat(uid, "/profileImage");
          return _context6.abrupt("return", new Promise(function (resolve, reject) {
            uploadFileBase64(base64, path).then(/*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(res) {
                var url;
                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return getFileURL(path);
                    case 2:
                      url = _context5.sent;
                      updateProfile({
                        profileImage: url
                      }).then(function () {
                        resolve(url);
                      })["catch"](function (err) {
                        reject(err);
                      });
                    case 4:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              return function (_x9) {
                return _ref6.apply(this, arguments);
              };
            }())["catch"](function (err) {
              reject(err);
            });
          }));
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateProfileImage(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
var getFileURL = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(name) {
    var url;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _storage.getDownloadURL)((0, _storage.ref)(storage, name));
        case 2:
          url = _context7.sent;
          return _context7.abrupt("return", url);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getFileURL(_x10) {
    return _ref7.apply(this, arguments);
  };
}();
var stripHTML = function stripHTML(html) {
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};
var lastEmail = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", new Promise(/*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
              var _auth$currentUser;
              var currentUID, q, querySnapshot, documents, now;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    currentUID = auth === null || auth === void 0 || (_auth$currentUser = auth.currentUser) === null || _auth$currentUser === void 0 ? void 0 : _auth$currentUser.uid;
                    q = (0, _firestore.query)((0, _firestore.collection)(defaultDB, 'mail') /* , where('__name__', 'in', docs) */);
                    _context8.next = 4;
                    return (0, _firestore.getDocs)(q);
                  case 4:
                    querySnapshot = _context8.sent;
                    documents = [currentUID];
                    now = new Date().getTime() / 1000; // console.log(firebase.firestore.FieldValue.serverTimestamp())
                    querySnapshot.forEach(function (doc) {
                      var minutesAgo = (now - doc._document.createTime.timestamp.seconds) / 60;
                      var hoursAgo = minutesAgo / 60;
                      var daysAgo = hoursAgo / 24;
                      documents.push(_objectSpread({
                        minutesAgo: minutesAgo,
                        hoursAgo: hoursAgo,
                        daysAgo: daysAgo
                      }, doc.data().to));
                    });
                    resolve(documents);
                  case 9:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x11, _x12) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function lastEmail() {
    return _ref8.apply(this, arguments);
  };
}();
var emailUser = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(emails, message, vars) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          emails = emails || [];
          message = message || {};
          vars = vars || {};
          return _context10.abrupt("return", new Promise(function (resolve, reject) {
            var _auth$currentUser2;
            var data = {
              to: Array.isArray(emails) ? emails : [emails]
            };
            if (!data.to.length) return reject("No email recipients");
            if (typeof message === 'string') data.template = {
              name: message,
              data: vars
            };else if (message.html || message.text) data.message = {
              subject: message.subject || '(No Subject)',
              text: message.text || stripHTML(message.html),
              html: message.html || message.text
            };
            if (data.template && !data.template.name) return reject("No email message");
            if (data.message && (!data.message.text || !data.message.html)) return reject("No email message");
            data.currentUID = auth === null || auth === void 0 || (_auth$currentUser2 = auth.currentUser) === null || _auth$currentUser2 === void 0 ? void 0 : _auth$currentUser2.uid;
            data.timestamp = (0, _firestore.serverTimestamp)(); // Timestamp.now(); // new Date().getTime();
            var mailRef = (0, _firestore.collection)(defaultDB, 'mail');
            var emailDoc = (0, _firestore.doc)(mailRef);
            (0, _firestore.setDoc)(emailDoc, data, {
              merge: true
            }).then(function () {
              resolve('Email sent');
            })["catch"](function (err) {
              reject("Email not sent: " + JSON.stringify(err));
            });
          }));
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function emailUser(_x13, _x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();
var googleMapsGeolocate = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(address) {
    var key, q, res, data, response, _data$results$, _iterator, _step, component, _data$results$0$geome, lat, lng;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          key = googleMapsConfig.apiKey;
          q = new URLSearchParams({
            address: address,
            key: key
          }).toString();
          _context11.next = 4;
          return fetch("https://maps.googleapis.com/maps/api/geocode/json?".concat(q));
        case 4:
          res = _context11.sent;
          _context11.next = 7;
          return res.json();
        case 7:
          data = _context11.sent;
          response = {
            geoPoint: null,
            geohash: null
          };
          if (data.results.length) {
            _iterator = _createForOfIteratorHelper((_data$results$ = data.results[0]) === null || _data$results$ === void 0 ? void 0 : _data$results$.address_components);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                component = _step.value;
                if (component.types.indexOf('postal_code') > -1) response.zipcode = parseInt(component.long_name);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
          _data$results$0$geome = data.results[0].geometry.location, lat = _data$results$0$geome.lat, lng = _data$results$0$geome.lng;
          if (lat && lng) response.geoPoint = new _firestore.GeoPoint(lat, lng);
          if (response.geoPoint) response.geohash = geofire.geohashForLocation([response.geoPoint._lat || response.geoPoint._latitude, response.geoPoint._long || response.geoPoint._longitude]);
          return _context11.abrupt("return", response);
        case 14:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function googleMapsGeolocate(_x16) {
    return _ref11.apply(this, arguments);
  };
}();
var signUp = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(email, password, input, userType, lang) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          email = email.trim().toLowerCase();
          password = password.trim();
          return _context13.abrupt("return", new Promise(/*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
              var _auth$currentUser3;
              var _yield$googleMapsGeol, geoPoint, geohash, user, UID, profilesRef, templateName, templateLang;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    if (!invalidateSignUpCredentials(email, password, reject)) {
                      _context12.next = 2;
                      break;
                    }
                    return _context12.abrupt("return");
                  case 2:
                    if (!invalidateSignUpInput(input, reject)) {
                      _context12.next = 4;
                      break;
                    }
                    return _context12.abrupt("return");
                  case 4:
                    if (!input.zip) {
                      _context12.next = 14;
                      break;
                    }
                    _context12.next = 7;
                    return googleMapsGeolocate(input.zip);
                  case 7:
                    _yield$googleMapsGeol = _context12.sent;
                    geoPoint = _yield$googleMapsGeol.geoPoint;
                    geohash = _yield$googleMapsGeol.geohash;
                    if (input.geoPoint === undefined && geoPoint) input.geoPoint = geoPoint;
                    if (input.geohash === undefined && geohash) input.geohash = geohash;
                    _context12.next = 16;
                    break;
                  case 14:
                    if (input.geoPoint === undefined) input.geoPoint = null;
                    if (input.geohash === undefined) input.geohash = null;
                  case 16:
                    _context12.prev = 16;
                    _context12.next = 19;
                    return (0, _auth.createUserWithEmailAndPassword)(auth, email.trim().toLowerCase(), password.trim());
                  case 19:
                    user = _context12.sent;
                    _context12.next = 25;
                    break;
                  case 22:
                    _context12.prev = 22;
                    _context12.t0 = _context12["catch"](16);
                    reject(_context12.t0);
                  case 25:
                    if (user) {
                      _context12.next = 27;
                      break;
                    }
                    return _context12.abrupt("return", reject("User not created"));
                  case 27:
                    UID = (_auth$currentUser3 = auth.currentUser) === null || _auth$currentUser3 === void 0 ? void 0 : _auth$currentUser3.uid;
                    if (UID) {
                      _context12.next = 30;
                      break;
                    }
                    return _context12.abrupt("return", reject("New UID not authenticated"));
                  case 30:
                    if (input.uid === undefined) input.uid = UID;
                    profilesRef = (0, _firestore.collection)(db, 'profiles');
                    templateName = "join-".concat(userType.toLowerCase());
                    templateLang = lang.toUpperCase();
                    (0, _firestore.setDoc)((0, _firestore.doc)(profilesRef, UID), input, {
                      merge: true
                    }).then(function (res) {
                      console.log(res);
                      // Send Welcome Email
                      emailUser(email, "email--".concat(templateName, "--").concat(templateLang), {
                        name: input.name.trim(),
                        year: new Date().getFullYear()
                      }).then(function (message) {
                        resolve(input);
                      })["catch"](console.error);
                    })["catch"](function (err) {
                      console.error(err);
                      reject("Profile data not loaded");
                    });
                  case 35:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12, null, [[16, 22]]);
            }));
            return function (_x22, _x23) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 3:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function signUp(_x17, _x18, _x19, _x20, _x21) {
    return _ref12.apply(this, arguments);
  };
}();
var updateProfile = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data) {
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", new Promise(/*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(resolve, reject) {
              var _auth$currentUser4;
              var UID, profilesRef, profileRef, profile, _yield$googleMapsGeol2, geoPoint, geohash;
              return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    UID = (_auth$currentUser4 = auth.currentUser) === null || _auth$currentUser4 === void 0 ? void 0 : _auth$currentUser4.uid;
                    profilesRef = (0, _firestore.collection)(db, 'profiles');
                    profileRef = (0, _firestore.doc)(profilesRef, UID);
                    _context14.next = 5;
                    return (0, _firestore.getDoc)(profileRef);
                  case 5:
                    profile = _context14.sent;
                    if (profile.exists()) {
                      _context14.next = 8;
                      break;
                    }
                    return _context14.abrupt("return", reject("Profile ".concat(UID, " doesn't exist.")));
                  case 8:
                    if (!(typeof data.zip === 'number')) {
                      _context14.next = 16;
                      break;
                    }
                    _context14.next = 11;
                    return googleMapsGeolocate(data.zip);
                  case 11:
                    _yield$googleMapsGeol2 = _context14.sent;
                    geoPoint = _yield$googleMapsGeol2.geoPoint;
                    geohash = _yield$googleMapsGeol2.geohash;
                    data.geoPoint = geoPoint;
                    data.geohash = geohash;
                  case 16:
                    (0, _firestore.setDoc)(profileRef, data, {
                      merge: true
                    }).then(function () {
                      resolve(data);
                    })["catch"](function (err) {
                      reject(err);
                    });
                  case 17:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            return function (_x25, _x26) {
              return _ref15.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function updateProfile(_x24) {
    return _ref14.apply(this, arguments);
  };
}();
var convertAuthErrorCodeToLangKey = function convertAuthErrorCodeToLangKey(code) {
  return code.replace(/^auth\//, 'ux.error.auth.').replace(/\-([a-z])/g, function (m, a) {
    return a.toUpperCase();
  });
};
var matchesAuthErrorCode = function matchesAuthErrorCode(code) {
  return !!code.match(/^auth\/[a-z\-]{1,}$/, code);
};
var processAuthError = function processAuthError(error) {
  var message = error.message,
    code = error.code;
  console.log(code, message);
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
var checkTranslated = function checkTranslated(t, key) {
  if (typeof t !== 'function') return undefined;
  if (typeof key != 'string') return undefined;
  var translated = t(key.trim());
  if (key.trim() == translated.trim()) return false;
  return true;
};
var getConstants = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(docs) {
    var q, querySnapshot, documents, _const;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          if (!cache.has('constants')) {
            _context16.next = 2;
            break;
          }
          return _context16.abrupt("return", cache.get('constants'));
        case 2:
          q = (0, _firestore.query)((0, _firestore.collection)(db, 'constants'), (0, _firestore.where)('__name__', 'in', docs));
          _context16.next = 5;
          return (0, _firestore.getDocs)(q);
        case 5:
          querySnapshot = _context16.sent;
          documents = [];
          querySnapshot.forEach(function (doc) {
            documents.push(doc.data());
          });
          _const = {};
          documents.forEach(function (_ref17) {
            var name = _ref17.name,
              map = _ref17.map;
            return _const[name] = map;
          });
          cache.set('constants', _const);
          return _context16.abrupt("return", _const);
        case 12:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function getConstants(_x27) {
    return _ref16.apply(this, arguments);
  };
}();
var getJobsInArea = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(area, onComplete) {
    var q, querySnapshot, jobs;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          q = (0, _firestore.query)((0, _firestore.collection)(db, 'Worker Requests'), (0, _firestore.where)('area', '==', area));
          _context17.next = 3;
          return (0, _firestore.getDocs)(q);
        case 3:
          querySnapshot = _context17.sent;
          jobs = [];
          querySnapshot.forEach(function (doc) {
            jobs.push(doc.data());
          });
          onComplete({
            success: true,
            data: jobs
          });
        case 7:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function getJobsInArea(_x28, _x29) {
    return _ref18.apply(this, arguments);
  };
}();
var geolocateProfiles = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(center, radiusInM, queryParams) {
    var centerArray, constraints, bounds, promises, _iterator2, _step2, b, q, profile, snapshots, matchingDocs, _iterator3, _step3, snap, _iterator4, _step4, _doc, _profile, lat, lng, distanceInKm, distanceInM;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          /* constraints = constraints || [];
          const postConstraints = [];
          const shouldInclude = profile => {
              let matched = false;
              if ( !postConstraints.length ) return matched;
              postConstraints.forEach(({field, value})=>{
                  if ( matched ) return;
                  if ( typeof profile[field] !== 'object' ) return;
                  if ( !Array.isArray(profile[field]) ) return;
                  if ( !value.length ) { matched = true; return; }
                  let count = 0;
                  value.forEach(v=>{
                      if ( profile[field].indexOf(v)>-1 ) count++;
                  })
                  if (count == value.length) matched = true;
              });
              return matched;
          }
          const processConstraints = _where => {
              const [field, op, value] = _where;
              if (op == 'array-contains' && Array.isArray(value)) {
                  const first = value.shift();
                  postConstraints.push({field, value});
                  _where[2] = first;
              }
              return where(..._where)
          } */
          if (!queryParams.has('settings.userViewType')) {
            queryParams.append('settings.userViewType', '1');
          }
          centerArray = Array.isArray(center) ? center : [center._latitude, center._longitude];
          radiusInM = radiusInM || 50 * 1000;
          constraints = [];
          queryParams["delete"]('geoPoint');
          queryParams["delete"]('zoom');
          queryParams.forEach(function (value, name) {
            if (value == '') return;
            switch (name) {
              case 'skills':
                var trades = [];
                value.split(',').map(function (v) {
                  return trades.push((0, _firestore.where)('trades', 'array-contains', parseInt(v)));
                });
                constraints.push((0, _firestore.and)(_firestore.or.apply(void 0, trades)));
                break;
              case 'availableWeekdays':
                var days = [];
                value.split(',').map(function (v) {
                  return days.push((0, _firestore.where)("".concat(name, ".").concat(v), '==', true));
                });
                constraints.push((0, _firestore.and)(_firestore.or.apply(void 0, days)));
                break;
              case 'settings.userViewType':
                constraints.push((0, _firestore.where)(name, '==', parseInt(value)));
                break;
              default:
                constraints.push((0, _firestore.where)(name, '==', Boolean(parseInt(value))));
            }
          });
          /**
           * `query(query, where(...), or(...))
           * `query(query, and(where(...), or(...)))`.
           */
          bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
          promises = [];
          _iterator2 = _createForOfIteratorHelper(bounds);
          _context18.prev = 10;
          _iterator2.s();
        case 12:
          if ((_step2 = _iterator2.n()).done) {
            _context18.next = 22;
            break;
          }
          b = _step2.value;
          q = (0, _firestore.query)((0, _firestore.collection)(db, 'profiles'), _firestore.and.apply(void 0, constraints), (0, _firestore.orderBy)('geohash'), (0, _firestore.startAt)(b[0]), (0, _firestore.endAt)(b[1])
          //...constraints
          );
          _context18.next = 17;
          return (0, _firestore.getDocs)(q);
        case 17:
          profile = _context18.sent;
          delete profile.email;
          promises.push(profile);
        case 20:
          _context18.next = 12;
          break;
        case 22:
          _context18.next = 27;
          break;
        case 24:
          _context18.prev = 24;
          _context18.t0 = _context18["catch"](10);
          _iterator2.e(_context18.t0);
        case 27:
          _context18.prev = 27;
          _iterator2.f();
          return _context18.finish(27);
        case 30:
          _context18.next = 32;
          return Promise.all(promises);
        case 32:
          snapshots = _context18.sent;
          matchingDocs = [];
          _iterator3 = _createForOfIteratorHelper(snapshots);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              snap = _step3.value;
              _iterator4 = _createForOfIteratorHelper(snap.docs);
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  _doc = _step4.value;
                  _profile = _doc.data(); // If postConstraints exist, check against
                  // if ( postConstraints.length && !shouldInclude(profile) ) continue;
                  // if ( filter && !filter(profile) ) continue;
                  // We have to filter out a few false positives due to GeoHash
                  // accuracy, but most will match
                  lat = _profile.geoPoint._lat;
                  lng = _profile.geoPoint._long;
                  distanceInKm = geofire.distanceBetween([lat, lng], centerArray);
                  distanceInM = distanceInKm * 1000;
                  if (distanceInM <= radiusInM) {
                    matchingDocs.push(_profile);
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return _context18.abrupt("return", matchingDocs);
        case 37:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[10, 24, 27, 30]]);
  }));
  return function geolocateProfiles(_x30, _x31, _x32) {
    return _ref19.apply(this, arguments);
  };
}();

/* const DW_PURCHASE_TYPE = {WEB: 'web', GOOGLE: 'google', APPLE: 'apple'};
const verifyInAppPurchase = async (type, recipt, transactionId) => {
    return new Promise(async (resolve, reject) => {
        switch(type) {
            case DW_PURCHASE_TYPE.WEB :
                // Check if transactionId is valid somehow
                const valid = true;
                if (valid) {
                    resolve({valid, message: 'Valid transactionId'});
                } else {
                    reject({valid, message: 'Invalid transactionId'});
                }
                break;
            case DW_PURCHASE_TYPE.GOOGLE :
            case DW_PURCHASE_TYPE.APPLE :
                const path = 'https://hire-8d535.firebaseapp.com/verifyInAppPurchase';
                fetch(path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({type, recipt, transactionId})
                }).then(async res=>{
                    resolve(await res.json());
                }).catch(err=>{
                    reject(err);
                });
                break;
            default :
                return reject('Invalid type');
        }
    })
} */

/* const createStripePaymentIntent = async () => {
    return new Promise(async (resolve, reject) => {
        const currentUID = auth?.currentUser?.uid;
        if (!currentUID) return reject('User not authenticated');
        const userURL = window.location.protocol + '//' + window.location.host + "/user";
        const sessionRef = await addDoc(
            collection(defaultDB, 'customers', currentUID, 'checkout_sessions'), {
                price: "price_1PdwtnLBuQpVAUgdUA3hHIeQ", // Example price in cents
                success_url: userURL,
                cancel_url: userURL,
                mode: "payment",
                //allow_promotion_codes: true,
            }
        );
        const unsubscribe = onSnapshot(doc(defaultDB, sessionRef.path), snap=>{
            const data = snap.data();
            if ( !data?.sessionId ) return;
            resolve( data );
            unsubscribe();
        }, err=>{
            reject(err);
        });
    })
} */

var DayworkerContext = exports.DayworkerContext = /*#__PURE__*/_react["default"].createContext({
  user: undefined,
  setUser: function () {
    var _setUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(user) {
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            return _context19.abrupt("return", null);
          case 1:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    }));
    function setUser(_x33) {
      return _setUser.apply(this, arguments);
    }
    return setUser;
  }(),
  userLoading: true,
  firebaseApp: app,
  auth: auth,
  signOut: signOut,
  signIn: signIn,
  signUp: signUp,
  sendUpdatePasswordEmail: sendUpdatePasswordEmail,
  updateProfile: updateProfile,
  processAuthError: processAuthError,
  checkTranslated: checkTranslated,
  constants: undefined,
  utils: utils,
  getConstants: getConstants,
  getAuthenticatedUserProfile: function () {
    var _getAuthenticatedUserProfile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            return _context20.abrupt("return", null);
          case 1:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    }));
    function getAuthenticatedUserProfile() {
      return _getAuthenticatedUserProfile.apply(this, arguments);
    }
    return getAuthenticatedUserProfile;
  }(),
  getJobsInArea: getJobsInArea,
  geolocateProfiles: geolocateProfiles,
  updateProfileImage: updateProfileImage
});
var useDayworker = exports.useDayworker = function useDayworker() {
  return (0, _react.useContext)(DayworkerContext);
};
var DayworkerProvider = exports.DayworkerProvider = function DayworkerProvider(_ref20) {
  var children = _ref20.children;
  var _useState = (0, _react.useState)(undefined),
    _useState2 = _slicedToArray(_useState, 2),
    user = _useState2[0],
    setUser = _useState2[1];
  var _useState3 = (0, _react.useState)(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    constants = _useState4[0],
    setConstants = _useState4[1];
  var getAuthenticatedUserProfile = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
    var q, querySnapshot, documents, profile;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          if (user) {
            _context21.next = 2;
            break;
          }
          return _context21.abrupt("return", null);
        case 2:
          if (!cache.has('profile')) {
            _context21.next = 4;
            break;
          }
          return _context21.abrupt("return", cache.get('profile'));
        case 4:
          q = (0, _firestore.query)((0, _firestore.collection)(db, 'profiles'), (0, _firestore.where)('uid', '==', user.uid));
          _context21.next = 7;
          return (0, _firestore.getDocs)(q);
        case 7:
          querySnapshot = _context21.sent;
          documents = [];
          querySnapshot.forEach(function (doc) {
            documents.push(doc.data());
          });
          profile = documents.length == 1 ? documents[0] : documents;
          cache.set('profile', profile);
          //if (DEV) console.log('profile', profile)
          return _context21.abrupt("return", profile);
        case 13:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  })), [user]);
  var API = (0, _react.useMemo)(function () {
    return {
      user: user,
      setUser: setUser,
      firebaseApp: app,
      auth: auth,
      signOut: signOut,
      signIn: signIn,
      signUp: signUp,
      sendUpdatePasswordEmail: sendUpdatePasswordEmail,
      updateProfile: updateProfile,
      processAuthError: processAuthError,
      checkTranslated: checkTranslated,
      constants: constants,
      utils: utils,
      getConstants: getConstants,
      getAuthenticatedUserProfile: getAuthenticatedUserProfile,
      getJobsInArea: getJobsInArea,
      geolocateProfiles: geolocateProfiles,
      updateProfileImage: updateProfileImage
    };
  }, [constants, getAuthenticatedUserProfile, user]);
  (0, _react.useEffect)(function () {
    auth.onAuthStateChanged(function (u) {
      return setUser(function (current) {
        return u;
      });
    });
    API.getConstants(['badges', 'bizFocus', 'regions', 'skillLevel', 'trades', 'settings']).then(function (c) {
      return setConstants(function (current) {
        return c;
      });
    });
  }, [API]);
  // return React.createElement(DayworkerContext.Provider, {value: API}, [...children]);
  return /*#__PURE__*/_react["default"].createElement(DayworkerContext.Provider, {
    value: API
  }, children);
};