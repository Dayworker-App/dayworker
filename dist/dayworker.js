"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = exports.useDayworker = exports.DayworkerProvider = exports.DayworkerContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var geofire = _interopRequireWildcard(require("geofire-common"));
var _firestore = require("@react-native-firebase/firestore");
var utils = _interopRequireWildcard(require("./utils"));
exports.utils = utils;
var _firebaseAnalyticsService = _interopRequireDefault(require("./analytics/providers/firebase/firebaseAnalyticsService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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

*/ // import useFirebaseAnalytics from './analytics/providers/firebase/useFirebaseAnalytics';
// let env = process.env.NODE_ENV;
// if (env === 'production') env = '(default)';
// if (env === 'production') {
//   env = 'development';
// }

var googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
};
var cache = new Map();
var DayworkerContext = exports.DayworkerContext = /*#__PURE__*/_react["default"].createContext({
  user: undefined,
  analytics: {},
  setUser: function () {
    var _setUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(user) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", null);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function setUser(_x) {
      return _setUser.apply(this, arguments);
    }
    return setUser;
  }(),
  constants: undefined,
  userLoading: true,
  firebaseApp: undefined,
  //app,
  auth: undefined,
  //auth,

  signOut: function () {
    var _signOut = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", null);
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function signOut() {
      return _signOut.apply(this, arguments);
    }
    return signOut;
  }(),
  signInWithPhoneNumber: function () {
    var _signInWithPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(phoneNumber) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", null);
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function signInWithPhoneNumber(_x2) {
      return _signInWithPhoneNumber.apply(this, arguments);
    }
    return signInWithPhoneNumber;
  }(),
  signInWithEmailAndPassword: function () {
    var _signInWithEmailAndPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(email, password) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", null);
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function signInWithEmailAndPassword(_x3, _x4) {
      return _signInWithEmailAndPassword.apply(this, arguments);
    }
    return signInWithEmailAndPassword;
  }(),
  signUp: function () {
    var _signUp = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(email, password, input, userType, lang) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", null);
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function signUp(_x5, _x6, _x7, _x8, _x9) {
      return _signUp.apply(this, arguments);
    }
    return signUp;
  }(),
  sendUpdatePasswordEmail: function () {
    var _sendUpdatePasswordEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(email) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", null);
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function sendUpdatePasswordEmail(_x0) {
      return _sendUpdatePasswordEmail.apply(this, arguments);
    }
    return sendUpdatePasswordEmail;
  }(),
  updateProfile: function () {
    var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", null);
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function updateProfile(_x1) {
      return _updateProfile.apply(this, arguments);
    }
    return updateProfile;
  }(),
  getUserProfileById: function () {
    var _getUserProfileById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userId) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", null);
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function getUserProfileById(_x10) {
      return _getUserProfileById.apply(this, arguments);
    }
    return getUserProfileById;
  }(),
  getConstants: function () {
    var _getConstants = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(docs) {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", null);
          case 1:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    function getConstants(_x11) {
      return _getConstants.apply(this, arguments);
    }
    return getConstants;
  }(),
  getAuthenticatedUserProfile: function () {
    var _getAuthenticatedUserProfile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0() {
      return _regeneratorRuntime().wrap(function _callee0$(_context0) {
        while (1) switch (_context0.prev = _context0.next) {
          case 0:
            return _context0.abrupt("return", null);
          case 1:
          case "end":
            return _context0.stop();
        }
      }, _callee0);
    }));
    function getAuthenticatedUserProfile() {
      return _getAuthenticatedUserProfile.apply(this, arguments);
    }
    return getAuthenticatedUserProfile;
  }(),
  getJobsInArea: function () {
    var _getJobsInArea = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(area, onComplete) {
      return _regeneratorRuntime().wrap(function _callee1$(_context1) {
        while (1) switch (_context1.prev = _context1.next) {
          case 0:
            return _context1.abrupt("return", null);
          case 1:
          case "end":
            return _context1.stop();
        }
      }, _callee1);
    }));
    function getJobsInArea(_x12, _x13) {
      return _getJobsInArea.apply(this, arguments);
    }
    return getJobsInArea;
  }(),
  geolocateProfiles: function () {
    var _geolocateProfiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(center, radiusInM, queryParams) {
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", null);
          case 1:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    function geolocateProfiles(_x14, _x15, _x16) {
      return _geolocateProfiles.apply(this, arguments);
    }
    return geolocateProfiles;
  }(),
  updateProfileImage: function () {
    var _updateProfileImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(uid, base64) {
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", null);
          case 1:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    function updateProfileImage(_x17, _x18) {
      return _updateProfileImage.apply(this, arguments);
    }
    return updateProfileImage;
  }(),
  emailUser: function () {
    var _emailUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(emails, message, vars) {
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", null);
          case 1:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    function emailUser(_x19, _x20, _x21) {
      return _emailUser.apply(this, arguments);
    }
    return emailUser;
  }(),
  googleMapsGeolocate: function () {
    var _googleMapsGeolocate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(address) {
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", null);
          case 1:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    function googleMapsGeolocate(_x22) {
      return _googleMapsGeolocate.apply(this, arguments);
    }
    return googleMapsGeolocate;
  }(),
  uploadFileBase64: function () {
    var _uploadFileBase = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(base64, path, format) {
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", null);
          case 1:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }));
    function uploadFileBase64(_x23, _x24, _x25) {
      return _uploadFileBase.apply(this, arguments);
    }
    return uploadFileBase64;
  }(),
  getFileURL: function () {
    var _getFileURL = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(name) {
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            return _context15.abrupt("return", null);
          case 1:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }));
    function getFileURL(_x26) {
      return _getFileURL.apply(this, arguments);
    }
    return getFileURL;
  }(),
  uploadResume: function () {
    var _uploadResume = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(uid, base64, callbacks) {
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            return _context16.abrupt("return", url);
          case 1:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    }));
    function uploadResume(_x27, _x28, _x29) {
      return _uploadResume.apply(this, arguments);
    }
    return uploadResume;
  }(),
  deleteResume: function () {
    var _deleteResume = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(uid) {
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            return _context17.abrupt("return", null);
          case 1:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }));
    function deleteResume(_x30) {
      return _deleteResume.apply(this, arguments);
    }
    return deleteResume;
  }(),
  deleteAccount: function () {
    var _deleteAccount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            return _context18.abrupt("return", null);
          case 1:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    }));
    function deleteAccount() {
      return _deleteAccount.apply(this, arguments);
    }
    return deleteAccount;
  }(),
  sendForgotPasswordEmail: function () {
    var _sendForgotPasswordEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(email) {
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
    function sendForgotPasswordEmail(_x31) {
      return _sendForgotPasswordEmail.apply(this, arguments);
    }
    return sendForgotPasswordEmail;
  }(),
  verifyPhoneNumber: function () {
    var _verifyPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(phone) {
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
    function verifyPhoneNumber(_x32) {
      return _verifyPhoneNumber.apply(this, arguments);
    }
    return verifyPhoneNumber;
  }(),
  updatePhoneNumber: function () {
    var _updatePhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(verificationId, code) {
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            return _context21.abrupt("return", null);
          case 1:
          case "end":
            return _context21.stop();
        }
      }, _callee21);
    }));
    function updatePhoneNumber(_x33, _x34) {
      return _updatePhoneNumber.apply(this, arguments);
    }
    return updatePhoneNumber;
  }(),
  linkPhoneNumber: function () {
    var _linkPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(verificationId, code) {
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            return _context22.abrupt("return", null);
          case 1:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    }));
    function linkPhoneNumber(_x35, _x36) {
      return _linkPhoneNumber.apply(this, arguments);
    }
    return linkPhoneNumber;
  }(),
  updateUserAuthEmail: function () {
    var _updateUserAuthEmail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(email) {
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            return _context23.abrupt("return", null);
          case 1:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    }));
    function updateUserAuthEmail(_x37) {
      return _updateUserAuthEmail.apply(this, arguments);
    }
    return updateUserAuthEmail;
  }(),
  reauthenticateUserWithEmailAndPassword: function reauthenticateUserWithEmailAndPassword(email, password) {
    return null;
  },
  reauthenticateUserWithPhoneNumber: function () {
    var _reauthenticateUserWithPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(verificationId, code) {
      return _regeneratorRuntime().wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            return _context24.abrupt("return", null);
          case 1:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    }));
    function reauthenticateUserWithPhoneNumber(_x38, _x39) {
      return _reauthenticateUserWithPhoneNumber.apply(this, arguments);
    }
    return reauthenticateUserWithPhoneNumber;
  }()
});
var useDayworker = exports.useDayworker = function useDayworker() {
  return (0, _react.useContext)(DayworkerContext);
};
var DayworkerProvider = exports.DayworkerProvider = function DayworkerProvider(_ref) {
  var children = _ref.children,
    firebase = _ref.firebase,
    _ref$firebase = _ref.firebase,
    app = _ref$firebase.app,
    analytics = _ref$firebase.analytics,
    storage = _ref$firebase.storage,
    store = _ref$firebase.store;
  var _useState = (0, _react.useState)(undefined),
    _useState2 = _slicedToArray(_useState, 2),
    user = _useState2[0],
    setUser = _useState2[1];
  var _useState3 = (0, _react.useState)(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    constants = _useState4[0],
    setConstants = _useState4[1];

  //   const app = !firebase.app.getApps().length
  //     ? firebase.app.initializeApp(firebaseConfig)
  //     : firebase.app.getApps()[0];

  var _firebase$auth = firebase.auth,
    createUserWithEmailAndPassword = _firebase$auth.createUserWithEmailAndPassword,
    deleteUser = _firebase$auth.deleteUser,
    getAuth = _firebase$auth.getAuth,
    onAuthStateChanged = _firebase$auth.onAuthStateChanged,
    sendPasswordResetEmail = _firebase$auth.sendPasswordResetEmail,
    _signInWithEmailAndPassword2 = _firebase$auth.signInWithEmailAndPassword,
    _signInWithPhoneNumber2 = _firebase$auth.signInWithPhoneNumber,
    _signOut2 = _firebase$auth.signOut,
    _verifyPhoneNumber2 = _firebase$auth.verifyPhoneNumber,
    reauthenticateWithCredential = _firebase$auth.reauthenticateWithCredential,
    PhoneAuthProvider = _firebase$auth.PhoneAuthProvider,
    EmailAuthProvider = _firebase$auth.EmailAuthProvider;
  var auth = getAuth(app);

  //   const db = store.getFirestore(app, env);
  //   const defaultDB =
  //     env != '(default)' ? store.getFirestore(app, '(default)') : db;

  // const firebaseAnalytics = useFirebaseAnalytics(analytics);

  var firebaseAnalytics = (0, _react.useMemo)(function () {
    var fbAnalytics = new _firebaseAnalyticsService["default"](analytics);
    // Singleton trick. Remove constructor to prevent object creating.
    fbAnalytics.constructor = null;
    return fbAnalytics;
  }, [analytics]);
  var API = (0, _react.useMemo)(function () {
    return {
      user: user,
      setUser: setUser,
      constants: constants,
      firebaseApp: app,
      auth: auth,
      analytics: firebaseAnalytics,
      signInWithEmailAndPassword: function () {
        var _signInWithEmailAndPassword3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(email, password) {
          return _regeneratorRuntime().wrap(function _callee26$(_context26) {
            while (1) switch (_context26.prev = _context26.next) {
              case 0:
                return _context26.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(resolve, reject) {
                    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                      while (1) switch (_context25.prev = _context25.next) {
                        case 0:
                          _context25.next = 2;
                          return _signInWithEmailAndPassword2(auth, email.toLowerCase().trim(), password.trim()).then(function (res) {
                            return resolve(res);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 2:
                        case "end":
                          return _context25.stop();
                      }
                    }, _callee25);
                  }));
                  return function (_x42, _x43) {
                    return _ref2.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context26.stop();
            }
          }, _callee26);
        }));
        function signInWithEmailAndPassword(_x40, _x41) {
          return _signInWithEmailAndPassword3.apply(this, arguments);
        }
        return signInWithEmailAndPassword;
      }(),
      signInWithPhoneNumber: function () {
        var _signInWithPhoneNumber3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(phoneNumber) {
          return _regeneratorRuntime().wrap(function _callee28$(_context28) {
            while (1) switch (_context28.prev = _context28.next) {
              case 0:
                return _context28.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(resolve, reject) {
                    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
                      while (1) switch (_context27.prev = _context27.next) {
                        case 0:
                          _context27.next = 2;
                          return _signInWithPhoneNumber2(auth, phoneNumber.trim()).then(function (confirmation) {
                            return resolve(confirmation);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 2:
                        case "end":
                          return _context27.stop();
                      }
                    }, _callee27);
                  }));
                  return function (_x45, _x46) {
                    return _ref3.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context28.stop();
            }
          }, _callee28);
        }));
        function signInWithPhoneNumber(_x44) {
          return _signInWithPhoneNumber3.apply(this, arguments);
        }
        return signInWithPhoneNumber;
      }(),
      verifyPhoneNumber: function () {
        var _verifyPhoneNumber3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(phoneNumber) {
          return _regeneratorRuntime().wrap(function _callee30$(_context30) {
            while (1) switch (_context30.prev = _context30.next) {
              case 0:
                return _context30.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(resolve, reject) {
                    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
                      while (1) switch (_context29.prev = _context29.next) {
                        case 0:
                          _context29.next = 2;
                          return _verifyPhoneNumber2(auth, phoneNumber.trim()).then(function (confirmation) {
                            return resolve(confirmation);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 2:
                        case "end":
                          return _context29.stop();
                      }
                    }, _callee29);
                  }));
                  return function (_x48, _x49) {
                    return _ref4.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context30.stop();
            }
          }, _callee30);
        }));
        function verifyPhoneNumber(_x47) {
          return _verifyPhoneNumber3.apply(this, arguments);
        }
        return verifyPhoneNumber;
      }(),
      verifyEmailAddress: function () {
        var _verifyEmailAddress = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32() {
          return _regeneratorRuntime().wrap(function _callee32$(_context32) {
            while (1) switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31(resolve, reject) {
                    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
                      while (1) switch (_context31.prev = _context31.next) {
                        case 0:
                          _context31.next = 2;
                          return sendEmailVerification(auth.currentUser).then(function (confirmation) {
                            return resolve(confirmation);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 2:
                        case "end":
                          return _context31.stop();
                      }
                    }, _callee31);
                  }));
                  return function (_x50, _x51) {
                    return _ref5.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context32.stop();
            }
          }, _callee32);
        }));
        function verifyEmailAddress() {
          return _verifyEmailAddress.apply(this, arguments);
        }
        return verifyEmailAddress;
      }(),
      updatePhoneNumber: function () {
        var _updatePhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(verificationId, code) {
          return _regeneratorRuntime().wrap(function _callee35$(_context35) {
            while (1) switch (_context35.prev = _context35.next) {
              case 0:
                return _context35.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(resolve, reject) {
                    var _auth$currentUser;
                    var credential;
                    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
                      while (1) switch (_context34.prev = _context34.next) {
                        case 0:
                          credential = PhoneAuthProvider.credential(verificationId, code.trim());
                          _context34.next = 3;
                          return (_auth$currentUser = auth.currentUser) === null || _auth$currentUser === void 0 ? void 0 : _auth$currentUser.updatePhoneNumber(credential).then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33() {
                            var _auth$currentUser2;
                            return _regeneratorRuntime().wrap(function _callee33$(_context33) {
                              while (1) switch (_context33.prev = _context33.next) {
                                case 0:
                                  _context33.next = 2;
                                  return (_auth$currentUser2 = auth.currentUser) === null || _auth$currentUser2 === void 0 ? void 0 : _auth$currentUser2.reload();
                                case 2:
                                  setUser(function () {
                                    return auth.currentUser;
                                  });
                                  resolve(auth.currentUser);
                                case 4:
                                case "end":
                                  return _context33.stop();
                              }
                            }, _callee33);
                          })))["catch"](function (error) {
                            return reject(error);
                          });
                        case 3:
                        case "end":
                          return _context34.stop();
                      }
                    }, _callee34);
                  }));
                  return function (_x54, _x55) {
                    return _ref6.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context35.stop();
            }
          }, _callee35);
        }));
        function updatePhoneNumber(_x52, _x53) {
          return _updatePhoneNumber2.apply(this, arguments);
        }
        return updatePhoneNumber;
      }(),
      linkPhoneNumber: function () {
        var _linkPhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37(verificationId, code) {
          return _regeneratorRuntime().wrap(function _callee37$(_context37) {
            while (1) switch (_context37.prev = _context37.next) {
              case 0:
                return _context37.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(resolve, reject) {
                    var _auth$currentUser3;
                    var credential;
                    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
                      while (1) switch (_context36.prev = _context36.next) {
                        case 0:
                          credential = PhoneAuthProvider.credential(verificationId, code.trim());
                          _context36.next = 3;
                          return (_auth$currentUser3 = auth.currentUser) === null || _auth$currentUser3 === void 0 ? void 0 : _auth$currentUser3.linkWithCredential(credential).then(function (userData) {
                            setUser(userData.user);
                            resolve(userData);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 3:
                        case "end":
                          return _context36.stop();
                      }
                    }, _callee36);
                  }));
                  return function (_x58, _x59) {
                    return _ref8.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context37.stop();
            }
          }, _callee37);
        }));
        function linkPhoneNumber(_x56, _x57) {
          return _linkPhoneNumber2.apply(this, arguments);
        }
        return linkPhoneNumber;
      }(),
      linkEmailAddress: function () {
        var _linkEmailAddress = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39(email, password) {
          return _regeneratorRuntime().wrap(function _callee39$(_context39) {
            while (1) switch (_context39.prev = _context39.next) {
              case 0:
                return _context39.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(resolve, reject) {
                    var _auth$currentUser4;
                    var credential;
                    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
                      while (1) switch (_context38.prev = _context38.next) {
                        case 0:
                          credential = EmailAuthProvider.credential(email.trim() || auth.currentUser.email, password);
                          _context38.next = 3;
                          return (_auth$currentUser4 = auth.currentUser) === null || _auth$currentUser4 === void 0 ? void 0 : _auth$currentUser4.linkWithCredential(credential).then(function (userData) {
                            setUser(userData.user);
                            resolve(userData);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 3:
                        case "end":
                          return _context38.stop();
                      }
                    }, _callee38);
                  }));
                  return function (_x62, _x63) {
                    return _ref9.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context39.stop();
            }
          }, _callee39);
        }));
        function linkEmailAddress(_x60, _x61) {
          return _linkEmailAddress.apply(this, arguments);
        }
        return linkEmailAddress;
      }(),
      reauthenticateUserWithPhoneNumber: function () {
        var _reauthenticateUserWithPhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41(verificationId, code) {
          return _regeneratorRuntime().wrap(function _callee41$(_context41) {
            while (1) switch (_context41.prev = _context41.next) {
              case 0:
                return _context41.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40(resolve, reject) {
                    var credential;
                    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
                      while (1) switch (_context40.prev = _context40.next) {
                        case 0:
                          credential = PhoneAuthProvider.credential(verificationId, code.trim());
                          _context40.next = 3;
                          return reauthenticateWithCredential(auth.currentUser, credential).then(function () {
                            return resolve();
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 3:
                        case "end":
                          return _context40.stop();
                      }
                    }, _callee40);
                  }));
                  return function (_x66, _x67) {
                    return _ref0.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context41.stop();
            }
          }, _callee41);
        }));
        function reauthenticateUserWithPhoneNumber(_x64, _x65) {
          return _reauthenticateUserWithPhoneNumber2.apply(this, arguments);
        }
        return reauthenticateUserWithPhoneNumber;
      }(),
      reauthenticateUserWithEmailAndPassword: function () {
        var _reauthenticateUserWithEmailAndPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43(email, password) {
          return _regeneratorRuntime().wrap(function _callee43$(_context43) {
            while (1) switch (_context43.prev = _context43.next) {
              case 0:
                return _context43.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42(resolve, reject) {
                    var _auth$currentUser5;
                    var credential;
                    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
                      while (1) switch (_context42.prev = _context42.next) {
                        case 0:
                          credential = EmailAuthProvider.credential(email.trim() || ((_auth$currentUser5 = auth.currentUser) === null || _auth$currentUser5 === void 0 ? void 0 : _auth$currentUser5.email), password);
                          _context42.next = 3;
                          return reauthenticateWithCredential(auth.currentUser, credential).then(function () {
                            return resolve();
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 3:
                        case "end":
                          return _context42.stop();
                      }
                    }, _callee42);
                  }));
                  return function (_x70, _x71) {
                    return _ref1.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context43.stop();
            }
          }, _callee43);
        }));
        function reauthenticateUserWithEmailAndPassword(_x68, _x69) {
          return _reauthenticateUserWithEmailAndPassword.apply(this, arguments);
        }
        return reauthenticateUserWithEmailAndPassword;
      }(),
      unlinkAuthProvider: function () {
        var _unlinkAuthProvider = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45(providerId) {
          return _regeneratorRuntime().wrap(function _callee45$(_context45) {
            while (1) switch (_context45.prev = _context45.next) {
              case 0:
                return _context45.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44(resolve, reject) {
                    var _auth$currentUser6;
                    return _regeneratorRuntime().wrap(function _callee44$(_context44) {
                      while (1) switch (_context44.prev = _context44.next) {
                        case 0:
                          _context44.next = 2;
                          return (_auth$currentUser6 = auth.currentUser) === null || _auth$currentUser6 === void 0 ? void 0 : _auth$currentUser6.unlink(providerId).then(function (userData) {
                            setUser(userData);
                            resolve(userData);
                          })["catch"](function (error) {
                            return reject(error);
                          });
                        case 2:
                        case "end":
                          return _context44.stop();
                      }
                    }, _callee44);
                  }));
                  return function (_x73, _x74) {
                    return _ref10.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context45.stop();
            }
          }, _callee45);
        }));
        function unlinkAuthProvider(_x72) {
          return _unlinkAuthProvider.apply(this, arguments);
        }
        return unlinkAuthProvider;
      }(),
      sendUpdatePasswordEmail: function () {
        var _sendUpdatePasswordEmail2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46(email) {
          var emailClean, query, domain, actionCodeSettings;
          return _regeneratorRuntime().wrap(function _callee46$(_context46) {
            while (1) switch (_context46.prev = _context46.next) {
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
                return _context46.abrupt("return", sendPasswordResetEmail(auth, emailClean, actionCodeSettings));
              case 5:
              case "end":
                return _context46.stop();
            }
          }, _callee46);
        }));
        function sendUpdatePasswordEmail(_x75) {
          return _sendUpdatePasswordEmail2.apply(this, arguments);
        }
        return sendUpdatePasswordEmail;
      }(),
      updateUserAuthEmail: function () {
        var _updateUserAuthEmail2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49(newEmail) {
          return _regeneratorRuntime().wrap(function _callee49$(_context49) {
            while (1) switch (_context49.prev = _context49.next) {
              case 0:
                return _context49.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(resolve, reject) {
                    return _regeneratorRuntime().wrap(function _callee48$(_context48) {
                      while (1) switch (_context48.prev = _context48.next) {
                        case 0:
                          _context48.next = 2;
                          return updateEmail(auth.currentUser, newEmail).then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47() {
                            var _auth$currentUser7;
                            return _regeneratorRuntime().wrap(function _callee47$(_context47) {
                              while (1) switch (_context47.prev = _context47.next) {
                                case 0:
                                  _context47.next = 2;
                                  return (_auth$currentUser7 = auth.currentUser) === null || _auth$currentUser7 === void 0 ? void 0 : _auth$currentUser7.reload();
                                case 2:
                                  setUser(function () {
                                    return auth.currentUser;
                                  });
                                  resolve(auth.currentUser);
                                case 4:
                                case "end":
                                  return _context47.stop();
                              }
                            }, _callee47);
                          })))["catch"](function (error) {
                            return reject(error);
                          });
                        case 2:
                        case "end":
                          return _context48.stop();
                      }
                    }, _callee48);
                  }));
                  return function (_x77, _x78) {
                    return _ref11.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context49.stop();
            }
          }, _callee49);
        }));
        function updateUserAuthEmail(_x76) {
          return _updateUserAuthEmail2.apply(this, arguments);
        }
        return updateUserAuthEmail;
      }(),
      signOut: function () {
        var _signOut3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50() {
          return _regeneratorRuntime().wrap(function _callee50$(_context50) {
            while (1) switch (_context50.prev = _context50.next) {
              case 0:
                _context50.next = 2;
                return _signOut2(auth);
              case 2:
                return _context50.abrupt("return", _context50.sent);
              case 3:
              case "end":
                return _context50.stop();
            }
          }, _callee50);
        }));
        function signOut() {
          return _signOut3.apply(this, arguments);
        }
        return signOut;
      }(),
      signUp: function () {
        var _signUp2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee52(email, password, input, userType, lang) {
          return _regeneratorRuntime().wrap(function _callee52$(_context52) {
            while (1) switch (_context52.prev = _context52.next) {
              case 0:
                email = email.trim().toLowerCase();
                password = password.trim();
                return _context52.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51(resolve, reject) {
                    var _auth$currentUser8;
                    var _yield$API$googleMaps, geoPoint, geohash, location, user, UID, templateName, templateLang;
                    return _regeneratorRuntime().wrap(function _callee51$(_context51) {
                      while (1) switch (_context51.prev = _context51.next) {
                        case 0:
                          if (!utils.invalidateSignUpCredentials(email, password, reject)) {
                            _context51.next = 2;
                            break;
                          }
                          return _context51.abrupt("return");
                        case 2:
                          if (!utils.invalidateSignUpInput(input, reject)) {
                            _context51.next = 4;
                            break;
                          }
                          return _context51.abrupt("return");
                        case 4:
                          if (!input.zip) {
                            _context51.next = 18;
                            break;
                          }
                          _context51.next = 7;
                          return API.googleMapsGeolocate(input.zip);
                        case 7:
                          _yield$API$googleMaps = _context51.sent;
                          geoPoint = _yield$API$googleMaps.geoPoint;
                          geohash = _yield$API$googleMaps.geohash;
                          if (input.geoPoint === undefined && geoPoint) {
                            input.geoPoint = geoPoint;
                          }
                          if (input.geohash === undefined && geohash) {
                            input.geohash = geohash;
                          }
                          _context51.next = 14;
                          return API.googleMapsReverseGeocode(geoPoint.latitude, geoPoint.longitude);
                        case 14:
                          location = _context51.sent;
                          input.region = "".concat(location.city, ", ").concat(location.state);
                          _context51.next = 20;
                          break;
                        case 18:
                          if (input.geoPoint === undefined) {
                            input.geoPoint = null;
                          }
                          if (input.geohash === undefined) {
                            input.geohash = null;
                          }
                        case 20:
                          _context51.prev = 20;
                          _context51.next = 23;
                          return createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password.trim());
                        case 23:
                          user = _context51.sent;
                          _context51.next = 29;
                          break;
                        case 26:
                          _context51.prev = 26;
                          _context51.t0 = _context51["catch"](20);
                          reject(_context51.t0);
                        case 29:
                          if (user) {
                            _context51.next = 31;
                            break;
                          }
                          return _context51.abrupt("return", reject('User not created'));
                        case 31:
                          UID = (_auth$currentUser8 = auth.currentUser) === null || _auth$currentUser8 === void 0 ? void 0 : _auth$currentUser8.uid;
                          if (UID) {
                            _context51.next = 34;
                            break;
                          }
                          return _context51.abrupt("return", reject('New UID not authenticated'));
                        case 34:
                          if (input.uid === undefined) {
                            input.uid = UID;
                          }
                          templateName = "join-".concat(userType.toLowerCase());
                          templateLang = lang.toUpperCase();
                          store.collection('profiles').doc(UID).set(input).then(function (res) {
                            // Send Welcome Email
                            API.emailUser(email, "email--".concat(templateName, "--").concat(templateLang), {
                              name: input.name.trim(),
                              year: new Date().getFullYear()
                            })
                            // .then(message => {
                            //   // Send verification email
                            //   API.verifyEmailAddress(email);
                            // })
                            .then(function () {
                              return resolve(input);
                            })["catch"](console.error);
                          })["catch"](function (err) {
                            console.error(err);
                            reject('Profile data not loaded');
                          });
                        case 38:
                        case "end":
                          return _context51.stop();
                      }
                    }, _callee51, null, [[20, 26]]);
                  }));
                  return function (_x84, _x85) {
                    return _ref13.apply(this, arguments);
                  };
                }()));
              case 3:
              case "end":
                return _context52.stop();
            }
          }, _callee52);
        }));
        function signUp(_x79, _x80, _x81, _x82, _x83) {
          return _signUp2.apply(this, arguments);
        }
        return signUp;
      }(),
      getUserProfileById: function () {
        var _getUserProfileById2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee54(userId) {
          return _regeneratorRuntime().wrap(function _callee54$(_context54) {
            while (1) switch (_context54.prev = _context54.next) {
              case 0:
                return _context54.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee53(resolve, reject) {
                    var profile, userProfile;
                    return _regeneratorRuntime().wrap(function _callee53$(_context53) {
                      while (1) switch (_context53.prev = _context53.next) {
                        case 0:
                          if (userId) {
                            _context53.next = 2;
                            break;
                          }
                          return _context53.abrupt("return", reject('No userId provided'));
                        case 2:
                          _context53.next = 4;
                          return store.collection('profiles').doc(userId).get();
                        case 4:
                          profile = _context53.sent;
                          if (profile.exists) {
                            _context53.next = 7;
                            break;
                          }
                          return _context53.abrupt("return", reject("Profile ".concat(userId, " doesn't exist.")));
                        case 7:
                          userProfile = profile.data();
                          resolve(userProfile);
                        case 9:
                        case "end":
                          return _context53.stop();
                      }
                    }, _callee53);
                  }));
                  return function (_x87, _x88) {
                    return _ref14.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context54.stop();
            }
          }, _callee54);
        }));
        function getUserProfileById(_x86) {
          return _getUserProfileById2.apply(this, arguments);
        }
        return getUserProfileById;
      }(),
      updateProfile: function () {
        var _updateProfile2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee56(data) {
          return _regeneratorRuntime().wrap(function _callee56$(_context56) {
            while (1) switch (_context56.prev = _context56.next) {
              case 0:
                return _context56.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee55(resolve, reject) {
                    var _auth$currentUser9;
                    var UID, profile, _yield$API$googleMaps2, geoPoint, geohash, location;
                    return _regeneratorRuntime().wrap(function _callee55$(_context55) {
                      while (1) switch (_context55.prev = _context55.next) {
                        case 0:
                          UID = (_auth$currentUser9 = auth.currentUser) === null || _auth$currentUser9 === void 0 ? void 0 : _auth$currentUser9.uid;
                          _context55.next = 3;
                          return store.collection('profiles').doc(UID).get();
                        case 3:
                          profile = _context55.sent;
                          if (profile.exists) {
                            _context55.next = 6;
                            break;
                          }
                          return _context55.abrupt("return", reject("Profile ".concat(UID, " doesn't exist.")));
                        case 6:
                          if (!data.email) {
                            _context55.next = 15;
                            break;
                          }
                          _context55.prev = 7;
                          _context55.next = 10;
                          return API.updateUserAuthEmail(data.email);
                        case 10:
                          _context55.next = 15;
                          break;
                        case 12:
                          _context55.prev = 12;
                          _context55.t0 = _context55["catch"](7);
                          reject(_context55.t0);
                        case 15:
                          if (!data.zip) {
                            _context55.next = 27;
                            break;
                          }
                          _context55.next = 18;
                          return API.googleMapsGeolocate(data.zip);
                        case 18:
                          _yield$API$googleMaps2 = _context55.sent;
                          geoPoint = _yield$API$googleMaps2.geoPoint;
                          geohash = _yield$API$googleMaps2.geohash;
                          data.geoPoint = geoPoint;
                          data.geohash = geohash;
                          _context55.next = 25;
                          return API.googleMapsReverseGeocode(geoPoint.latitude, geoPoint.longitude);
                        case 25:
                          location = _context55.sent;
                          data.region = "".concat(location.city, ", ").concat(location.state);
                        case 27:
                          _context55.next = 29;
                          return store.collection('profiles').doc(UID).update(data).then(function () {
                            var currentProfile = cache.get('profile');
                            var updatedProfile = _objectSpread(_objectSpread({}, currentProfile), data);
                            cache.set('profile', updatedProfile);
                            resolve(updatedProfile);
                          })["catch"](function (err) {
                            reject(err);
                          });
                        case 29:
                        case "end":
                          return _context55.stop();
                      }
                    }, _callee55, null, [[7, 12]]);
                  }));
                  return function (_x90, _x91) {
                    return _ref15.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context56.stop();
            }
          }, _callee56);
        }));
        function updateProfile(_x89) {
          return _updateProfile2.apply(this, arguments);
        }
        return updateProfile;
      }(),
      getConstants: function () {
        var _getConstants2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee57() {
          var docs,
            querySnapshot,
            documents,
            _const,
            _args57 = arguments;
          return _regeneratorRuntime().wrap(function _callee57$(_context57) {
            while (1) switch (_context57.prev = _context57.next) {
              case 0:
                docs = _args57.length > 0 && _args57[0] !== undefined ? _args57[0] : ['badges', 'bizFocus', 'regions', 'skillLevel', 'trades', 'skills', 'settings', 'privacyVersion', 'termsVersion'];
                if (!cache.has('constants')) {
                  _context57.next = 3;
                  break;
                }
                return _context57.abrupt("return", cache.get('constants'));
              case 3:
                _context57.next = 5;
                return store.collection('constants').where('__name__', 'in', docs).get();
              case 5:
                querySnapshot = _context57.sent;
                documents = [];
                querySnapshot.forEach(function (d) {
                  documents.push(d.data());
                });
                _const = {};
                documents.forEach(function (_ref16) {
                  var name = _ref16.name,
                    map = _ref16.map;
                  return _const[name] = map;
                });
                cache.set('constants', _const);
                return _context57.abrupt("return", _const);
              case 12:
              case "end":
                return _context57.stop();
            }
          }, _callee57);
        }));
        function getConstants() {
          return _getConstants2.apply(this, arguments);
        }
        return getConstants;
      }(),
      /**
       * Return the authenticated user's profile.
       * @param noCache - When set to true, will skip using the cache and fetch directly from firebase.
       */
      getAuthenticatedUserProfile: function () {
        var _getAuthenticatedUserProfile2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee58() {
          var noCache,
            _args58 = arguments;
          return _regeneratorRuntime().wrap(function _callee58$(_context58) {
            while (1) switch (_context58.prev = _context58.next) {
              case 0:
                noCache = _args58.length > 0 && _args58[0] !== undefined ? _args58[0] : false;
                if (user) {
                  _context58.next = 3;
                  break;
                }
                return _context58.abrupt("return", null);
              case 3:
                if (!(!noCache && cache.has('profile'))) {
                  _context58.next = 5;
                  break;
                }
                return _context58.abrupt("return", cache.get('profile'));
              case 5:
                _context58.next = 7;
                return store.collection('profiles').doc(user.uid).get().then(function (documentSnapshot) {
                  // console.log('User exists: ', documentSnapshot.exists);

                  if (documentSnapshot.exists) {
                    // console.log('documentSnapshot.data(): ', documentSnapshot.data());

                    var userProfile = documentSnapshot.data();
                    cache.set('profile', userProfile);
                    return userProfile;
                  }
                  return;
                });
              case 7:
                return _context58.abrupt("return", _context58.sent);
              case 8:
              case "end":
                return _context58.stop();
            }
          }, _callee58);
        }));
        function getAuthenticatedUserProfile() {
          return _getAuthenticatedUserProfile2.apply(this, arguments);
        }
        return getAuthenticatedUserProfile;
      }(),
      getJobsInArea: function () {
        var _getJobsInArea2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee59(area, onComplete) {
          var querySnapshot, jobs;
          return _regeneratorRuntime().wrap(function _callee59$(_context59) {
            while (1) switch (_context59.prev = _context59.next) {
              case 0:
                _context59.next = 2;
                return store.collection('Worker Requests').where('area', '==', area).get();
              case 2:
                querySnapshot = _context59.sent;
                jobs = [];
                querySnapshot.forEach(function (d) {
                  jobs.push(d.data());
                });
                onComplete({
                  success: true,
                  data: jobs
                });
              case 6:
              case "end":
                return _context59.stop();
            }
          }, _callee59);
        }));
        function getJobsInArea(_x92, _x93) {
          return _getJobsInArea2.apply(this, arguments);
        }
        return getJobsInArea;
      }(),
      geolocateProfiles: function () {
        var _geolocateProfiles2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee60(center, radiusInM, queryParams) {
          var centerArray, constraints, searchParams, bounds, promises, _iterator, _step, b, snapshots, matchingDocs, _iterator2, _step2, snap, _iterator3, _step3, d, profile, testAccountEmails, lat, lng, distanceInKm, distanceInM;
          return _regeneratorRuntime().wrap(function _callee60$(_context60) {
            while (1) switch (_context60.prev = _context60.next) {
              case 0:
                if (!queryParams.has('settings.userViewType')) {
                  // console.log('query params do NOT contain userViewType');
                  queryParams.append('settings.userViewType', 1);
                }
                centerArray = Array.isArray(center) ? center : [center._latitude, center._longitude];
                radiusInM = radiusInM || 50 * 1000;
                constraints = [];
                queryParams["delete"]('geoPoint');
                queryParams["delete"]('zoom');
                searchParams = Object.fromEntries(_toConsumableArray(queryParams.entries())); // console.log(
                //   'SDK searchParams: ',
                //   JSON.stringify(searchParams, null, 2),
                // );
                Object.keys(searchParams).forEach(function (key) {
                  var availableWeekdays = [];
                  if (searchParams[key]) {
                    if (key === 'skills') {
                      var skillsArray = searchParams[key].split(',').map(function (s) {
                        return parseInt(s, 10);
                      });
                      constraints.push((0, _firestore.Filter)('trades', 'array-contains-any', skillsArray));
                    }
                    if (key === 'bizFocus') {
                      var bizFocusArray = searchParams[key].split(',').map(function (s) {
                        return parseInt(s, 10);
                      });
                      constraints.push((0, _firestore.Filter)('contractorData.bizFocus', 'array-contains-any', bizFocusArray));
                    }
                    if (key === 'availableWeekdays') {
                      var days = searchParams[key].split(',');
                      availableWeekdays.length = 0;
                      days.forEach(function (day) {
                        availableWeekdays.push((0, _firestore.Filter)("availableWeekdays.".concat(day), '==', true));
                        // constraints.push(
                        //   Filter(`availableWeekdays.${day}`, '==', true),
                        // );
                      });
                    }
                    if (key === 'settings.userViewType') {
                      constraints.push((0, _firestore.Filter)(key, '==', parseInt(searchParams[key], 10)));
                    }
                  }
                  if (availableWeekdays.length) {
                    constraints.push(_firestore.Filter.or.apply(_firestore.Filter, availableWeekdays));
                  }
                });
                bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
                promises = []; // console.log('bounds: ', bounds);
                _iterator = _createForOfIteratorHelper(bounds);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    b = _step.value;
                    promises.push(store.collection('profiles').where(constraints.length > 1 ? _firestore.Filter.and.apply(_firestore.Filter, constraints) : constraints[0]).orderBy('geohash').startAt(b[0]).endAt(b[1]).get());
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _context60.next = 14;
                return Promise.all(promises);
              case 14:
                snapshots = _context60.sent;
                matchingDocs = [];
                _iterator2 = _createForOfIteratorHelper(snapshots);
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    snap = _step2.value;
                    if (snap.size) {
                      _iterator3 = _createForOfIteratorHelper(snap.docs);
                      try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                          d = _step3.value;
                          profile = d.data();
                          testAccountEmails = ['test.worker@dayworker.co', 'test.contractor@dayworker.co'];
                          if (!testAccountEmails.includes(profile.email)) {
                            // console.log('profile: ', JSON.stringify(profile, null, 2));
                            // If postConstraints exist, check against
                            // if ( postConstraints.length && !shouldInclude(profile) ) continue;
                            // if ( filter && !filter(profile) ) continue;
                            // We have to filter out a few false positives due to GeoHash
                            // accuracy, but most will match
                            // const lat = profile.geoPoint._lat;
                            // const lng = profile.geoPoint._long;
                            lat = profile.geoPoint.latitude;
                            lng = profile.geoPoint.longitude;
                            distanceInKm = geofire.distanceBetween([lat, lng], centerArray);
                            distanceInM = distanceInKm * 1000;
                            if (distanceInM <= radiusInM) {
                              matchingDocs.push(profile);
                            }
                          }
                        }
                      } catch (err) {
                        _iterator3.e(err);
                      } finally {
                        _iterator3.f();
                      }
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                return _context60.abrupt("return", matchingDocs);
              case 19:
              case "end":
                return _context60.stop();
            }
          }, _callee60);
        }));
        function geolocateProfiles(_x94, _x95, _x96) {
          return _geolocateProfiles2.apply(this, arguments);
        }
        return geolocateProfiles;
      }(),
      updateProfileImage: function () {
        var _updateProfileImage2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee62(uid, base64, callbacks) {
          var path;
          return _regeneratorRuntime().wrap(function _callee62$(_context62) {
            while (1) switch (_context62.prev = _context62.next) {
              case 0:
                // Check if uid exists
                path = "".concat(uid, "/profileImage");
                return _context62.abrupt("return", new Promise(function (resolve, reject) {
                  API.uploadFileBase64(base64, path, null, callbacks).then(/*#__PURE__*/function () {
                    var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee61(res) {
                      var url;
                      return _regeneratorRuntime().wrap(function _callee61$(_context61) {
                        while (1) switch (_context61.prev = _context61.next) {
                          case 0:
                            _context61.next = 2;
                            return API.getFileURL(path);
                          case 2:
                            url = _context61.sent;
                            API.updateProfile({
                              profileImage: url
                            }).then(function () {
                              resolve(url);
                            })["catch"](function (err) {
                              reject(err);
                            });
                          case 4:
                          case "end":
                            return _context61.stop();
                        }
                      }, _callee61);
                    }));
                    return function (_x100) {
                      return _ref17.apply(this, arguments);
                    };
                  }())["catch"](function (err) {
                    reject(err);
                  });
                }));
              case 2:
              case "end":
                return _context62.stop();
            }
          }, _callee62);
        }));
        function updateProfileImage(_x97, _x98, _x99) {
          return _updateProfileImage2.apply(this, arguments);
        }
        return updateProfileImage;
      }(),
      uploadResume: function () {
        var _uploadResume2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee64(uid, base64, callbacks) {
          var path;
          return _regeneratorRuntime().wrap(function _callee64$(_context64) {
            while (1) switch (_context64.prev = _context64.next) {
              case 0:
                // Check if uid exists
                path = "".concat(uid, "/resume");
                return _context64.abrupt("return", new Promise(function (resolve, reject) {
                  API.uploadFileBase64(base64, path, null, callbacks).then(/*#__PURE__*/function () {
                    var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee63(res) {
                      var url;
                      return _regeneratorRuntime().wrap(function _callee63$(_context63) {
                        while (1) switch (_context63.prev = _context63.next) {
                          case 0:
                            _context63.next = 2;
                            return API.getFileURL(path);
                          case 2:
                            url = _context63.sent;
                            API.updateProfile({
                              resume: url
                            }).then(function () {
                              resolve(url);
                            })["catch"](function (err) {
                              reject(err);
                            });
                          case 4:
                          case "end":
                            return _context63.stop();
                        }
                      }, _callee63);
                    }));
                    return function (_x104) {
                      return _ref18.apply(this, arguments);
                    };
                  }())["catch"](function (err) {
                    reject(err);
                  });
                }));
              case 2:
              case "end":
                return _context64.stop();
            }
          }, _callee64);
        }));
        function uploadResume(_x101, _x102, _x103) {
          return _uploadResume2.apply(this, arguments);
        }
        return uploadResume;
      }(),
      deleteResume: function () {
        var _deleteResume2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee65(uid) {
          var path, resumeRef;
          return _regeneratorRuntime().wrap(function _callee65$(_context65) {
            while (1) switch (_context65.prev = _context65.next) {
              case 0:
                path = "".concat(uid, "/resume");
                resumeRef = storage.ref(path);
                _context65.next = 4;
                return resumeRef["delete"]();
              case 4:
                return _context65.abrupt("return", new Promise(function (resolve, reject) {
                  API.updateProfile({
                    resume: null
                  }).then(function () {
                    resolve({
                      success: true
                    });
                  })["catch"](function (err) {
                    reject(err);
                  });
                }));
              case 5:
              case "end":
                return _context65.stop();
            }
          }, _callee65);
        }));
        function deleteResume(_x105) {
          return _deleteResume2.apply(this, arguments);
        }
        return deleteResume;
      }(),
      emailUser: function () {
        var _emailUser2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee66(emails, message, vars) {
          return _regeneratorRuntime().wrap(function _callee66$(_context66) {
            while (1) switch (_context66.prev = _context66.next) {
              case 0:
                emails = emails || [];
                message = message || {};
                vars = vars || {};
                return _context66.abrupt("return", new Promise(function (resolve, reject) {
                  var _auth$currentUser0;
                  var data = {
                    to: Array.isArray(emails) ? emails : [emails]
                  };
                  if (!data.to.length) {
                    return reject('No email recipients');
                  }
                  if (typeof message === 'string') {
                    data.template = {
                      name: message,
                      data: vars
                    };
                  } else if (message.html || message.text) {
                    data.message = {
                      subject: message.subject || '(No Subject)',
                      text: message.text || utils.stripHTML(message.html),
                      html: message.html || message.text
                    };
                  }
                  if (data.template && !data.template.name) {
                    return reject('No email message');
                  }
                  if (data.message && (!data.message.text || !data.message.html)) {
                    return reject('No email message');
                  }
                  data.currentUID = auth === null || auth === void 0 || (_auth$currentUser0 = auth.currentUser) === null || _auth$currentUser0 === void 0 ? void 0 : _auth$currentUser0.uid;
                  data.timestamp = _firestore.FieldValue.serverTimestamp(); // store.serverTimestamp(); // Timestamp.now(); // new Date().getTime();

                  var mailRef = store === null || store === void 0 ? void 0 : store.collection('mail');
                  var emailDoc = mailRef.doc().id;
                  store.collection('mail').doc(emailDoc).set(data, {
                    merge: true
                  }).then(function () {
                    resolve('Email sent');
                    console.log('Email sent');
                  })["catch"](function (err) {
                    reject('Email not sent: ' + JSON.stringify(err));
                  });
                }));
              case 4:
              case "end":
                return _context66.stop();
            }
          }, _callee66);
        }));
        function emailUser(_x106, _x107, _x108) {
          return _emailUser2.apply(this, arguments);
        }
        return emailUser;
      }(),
      googleMapsReverseGeocode: function () {
        var _googleMapsReverseGeocode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee67(lat, lng) {
          var key, q, res, data, response, _data$results$, _iterator4, _step4, component;
          return _regeneratorRuntime().wrap(function _callee67$(_context67) {
            while (1) switch (_context67.prev = _context67.next) {
              case 0:
                // TODO: merge this with googleMapsGeolocate by passing query params or string as argument
                key = googleMapsConfig.apiKey;
                q = new URLSearchParams({
                  latlng: [lat, lng].join(','),
                  key: key
                }).toString();
                _context67.next = 4;
                return fetch("https://maps.googleapis.com/maps/api/geocode/json?".concat(q));
              case 4:
                res = _context67.sent;
                _context67.next = 7;
                return res.json();
              case 7:
                data = _context67.sent;
                response = {
                  city: null,
                  state: null
                };
                if (data.results.length) {
                  _iterator4 = _createForOfIteratorHelper((_data$results$ = data.results[0]) === null || _data$results$ === void 0 ? void 0 : _data$results$.address_components);
                  try {
                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      component = _step4.value;
                      if (component.types.indexOf('locality') > -1) {
                        response.city = component.long_name;
                      } else if (component.types.indexOf('sublocality') > -1) {
                        response.city = component.long_name;
                      } else if (component.types.indexOf('neighborhood') > -1) {
                        response.city = component.long_name;
                      }
                      if (component.types.indexOf('administrative_area_level_1') > -1) {
                        response.state = component.short_name;
                      }
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
                  }
                }
                return _context67.abrupt("return", response);
              case 11:
              case "end":
                return _context67.stop();
            }
          }, _callee67);
        }));
        function googleMapsReverseGeocode(_x109, _x110) {
          return _googleMapsReverseGeocode.apply(this, arguments);
        }
        return googleMapsReverseGeocode;
      }(),
      googleMapsGeolocate: function () {
        var _googleMapsGeolocate2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee68(address) {
          var key, q, res, data, response, _data$results$2, _iterator5, _step5, component, _data$results$0$geome, lat, lng;
          return _regeneratorRuntime().wrap(function _callee68$(_context68) {
            while (1) switch (_context68.prev = _context68.next) {
              case 0:
                key = googleMapsConfig.apiKey;
                q = new URLSearchParams({
                  address: address,
                  key: key
                }).toString();
                _context68.next = 4;
                return fetch("https://maps.googleapis.com/maps/api/geocode/json?".concat(q));
              case 4:
                res = _context68.sent;
                _context68.next = 7;
                return res.json();
              case 7:
                data = _context68.sent;
                // console.log('data: ', data);
                response = {
                  geoPoint: null,
                  geohash: null
                };
                if (data.results.length) {
                  _iterator5 = _createForOfIteratorHelper((_data$results$2 = data.results[0]) === null || _data$results$2 === void 0 ? void 0 : _data$results$2.address_components);
                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      component = _step5.value;
                      if (component.types.indexOf('postal_code') > -1) {
                        response.zipcode = parseInt(component.long_name);
                      }
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                }
                _data$results$0$geome = data.results[0].geometry.location, lat = _data$results$0$geome.lat, lng = _data$results$0$geome.lng;
                if (lat && lng) {
                  response.geoPoint = new _firestore.GeoPoint(lat, lng);
                }
                if (response.geoPoint) {
                  response.geohash = geofire.geohashForLocation([response.geoPoint._lat || response.geoPoint._latitude, response.geoPoint._long || response.geoPoint._longitude]);
                }
                return _context68.abrupt("return", response);
              case 14:
              case "end":
                return _context68.stop();
            }
          }, _callee68);
        }));
        function googleMapsGeolocate(_x111) {
          return _googleMapsGeolocate2.apply(this, arguments);
        }
        return googleMapsGeolocate;
      }(),
      uploadFileBase64: function () {
        var _uploadFileBase2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee69(base64, path) {
          var format,
            callbacks,
            task,
            _args69 = arguments;
          return _regeneratorRuntime().wrap(function _callee69$(_context69) {
            while (1) switch (_context69.prev = _context69.next) {
              case 0:
                format = _args69.length > 2 && _args69[2] !== undefined ? _args69[2] : 'data_url';
                callbacks = _args69.length > 3 ? _args69[3] : undefined;
                // format = format || 'data_url'; // 'base64' | 'base64url' | 'data_url'
                // const storageRef = storage.ref(path);
                task = storage.ref(path).putFile(base64);
                task.on('state_changed', function (taskSnapshot) {
                  var _callbacks$onUploadPr;
                  // console.log(
                  //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                  // );
                  callbacks === null || callbacks === void 0 || (_callbacks$onUploadPr = callbacks.onUploadProgress) === null || _callbacks$onUploadPr === void 0 || _callbacks$onUploadPr.call(callbacks, {
                    progress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100
                  });
                });
                return _context69.abrupt("return", task.then(function () {
                  var _callbacks$onSuccess;
                  // console.log('Image uploaded to the bucket!');
                  callbacks === null || callbacks === void 0 || (_callbacks$onSuccess = callbacks.onSuccess) === null || _callbacks$onSuccess === void 0 || _callbacks$onSuccess.call(callbacks, task);
                  return task;
                })["catch"](function (e) {
                  var _callbacks$onError;
                  console.error('upload file error: ', e.message);
                  callbacks === null || callbacks === void 0 || (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, e);
                }));
              case 5:
              case "end":
                return _context69.stop();
            }
          }, _callee69);
        }));
        function uploadFileBase64(_x112, _x113) {
          return _uploadFileBase2.apply(this, arguments);
        }
        return uploadFileBase64;
      }(),
      getFileURL: function () {
        var _getFileURL2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee70(name) {
          var url;
          return _regeneratorRuntime().wrap(function _callee70$(_context70) {
            while (1) switch (_context70.prev = _context70.next) {
              case 0:
                _context70.next = 2;
                return storage.ref(name).getDownloadURL();
              case 2:
                url = _context70.sent;
                return _context70.abrupt("return", url);
              case 4:
              case "end":
                return _context70.stop();
            }
          }, _callee70);
        }));
        function getFileURL(_x114) {
          return _getFileURL2.apply(this, arguments);
        }
        return getFileURL;
      }(),
      deleteAccount: function () {
        var _deleteAccount2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee72() {
          return _regeneratorRuntime().wrap(function _callee72$(_context72) {
            while (1) switch (_context72.prev = _context72.next) {
              case 0:
                return _context72.abrupt("return", new Promise(/*#__PURE__*/function () {
                  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee71(resolve, reject) {
                    var _auth$currentUser1, UID, profileRef;
                    return _regeneratorRuntime().wrap(function _callee71$(_context71) {
                      while (1) switch (_context71.prev = _context71.next) {
                        case 0:
                          _context71.prev = 0;
                          // We may want to delete more content. I.e. nudges, favorites, etc.
                          UID = (_auth$currentUser1 = auth.currentUser) === null || _auth$currentUser1 === void 0 ? void 0 : _auth$currentUser1.uid;
                          profileRef = store.collection('profiles').doc(UID);
                          return _context71.abrupt("return", profileRef["delete"]().then(function () {
                            return deleteUser(auth.currentUser);
                            // return auth.currentUser?.delete?.();
                          }).then(function () {
                            return resolve(true);
                          })["catch"](function (error) {
                            reject(error);
                          }));
                        case 6:
                          _context71.prev = 6;
                          _context71.t0 = _context71["catch"](0);
                          reject(_context71.t0);
                        case 9:
                        case "end":
                          return _context71.stop();
                      }
                    }, _callee71, null, [[0, 6]]);
                  }));
                  return function (_x115, _x116) {
                    return _ref19.apply(this, arguments);
                  };
                }()));
              case 1:
              case "end":
                return _context72.stop();
            }
          }, _callee72);
        }));
        function deleteAccount() {
          return _deleteAccount2.apply(this, arguments);
        }
        return deleteAccount;
      }(),
      sendForgotPasswordEmail: function () {
        var _sendForgotPasswordEmail2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee73(email) {
          return _regeneratorRuntime().wrap(function _callee73$(_context73) {
            while (1) switch (_context73.prev = _context73.next) {
              case 0:
                _context73.next = 2;
                return sendPasswordResetEmail(auth, email);
              case 2:
                return _context73.abrupt("return", _context73.sent);
              case 3:
              case "end":
                return _context73.stop();
            }
          }, _callee73);
        }));
        function sendForgotPasswordEmail(_x117) {
          return _sendForgotPasswordEmail2.apply(this, arguments);
        }
        return sendForgotPasswordEmail;
      }()
    };
  }, [EmailAuthProvider, PhoneAuthProvider, app, auth, constants, createUserWithEmailAndPassword, store, deleteUser, firebaseAnalytics, reauthenticateWithCredential, sendPasswordResetEmail, _signInWithEmailAndPassword2, _signInWithPhoneNumber2, _signOut2, storage, user, _verifyPhoneNumber2]);
  (0, _react.useEffect)(function () {
    var subscriber = onAuthStateChanged(auth, function (u) {
      // console.log('Auth State Changed: ', JSON.stringify(u || {}, null, 2));
      setUser(function () {
        return u;
      });
      if (!u) {
        cache.clear();
      }
    });
    API.getConstants(['badges', 'bizFocus', 'regions', 'skillLevel', 'trades', 'skills', 'settings', 'privacyVersion', 'termsVersion']).then(function (c) {
      return setConstants(function () {
        return c;
      });
    });
    return subscriber; // unsubscribe on unmount
  }, [API, auth, onAuthStateChanged]);
  // return React.createElement(DayworkerContext.Provider, {value: API}, [...children]);
  return /*#__PURE__*/_react["default"].createElement(DayworkerContext.Provider, {
    value: API
  }, children);
};