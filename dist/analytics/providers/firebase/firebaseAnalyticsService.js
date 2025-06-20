"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events = _interopRequireDefault(require("./events"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import { useCallback, useMemo } from 'react';
// type EventNameType = keyof FirebaseEvents;
var FirebaseAnalyticsService = /*#__PURE__*/function () {
  function FirebaseAnalyticsService(firebaseAnalytics) {
    _classCallCheck(this, FirebaseAnalyticsService);
    this.firebaseAnalytics = firebaseAnalytics;
    this.analytics = this.firebaseAnalytics.getAnalytics();
  }

  /**
   * @method trackScreenView
   * @description This method logs a screen view event with the specified screen name.
   * @param screenName - The name of the screen.
   * @returns  Promise<void>
   */
  return _createClass(FirebaseAnalyticsService, [{
    key: "trackScreenView",
    value: (function () {
      var _trackScreenView = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(screenName) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.firebaseAnalytics.logEvent(this.analytics, 'screen_view', {
                screen_name: screenName
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function trackScreenView(_x) {
        return _trackScreenView.apply(this, arguments);
      }
      return trackScreenView;
    }()
    /**
     * @method trackSignUpSubmitted
     * @description This method logs a click or press to the sign up button.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSignUpSubmitted",
    value: (function () {
      var _trackSignUpSubmitted = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(eventParams) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SIGN_UP_SUBMITTED, eventParams);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function trackSignUpSubmitted(_x2) {
        return _trackSignUpSubmitted.apply(this, arguments);
      }
      return trackSignUpSubmitted;
    }()
    /**
     * @method trackSignUpSuccess
     * @description This method logs a successful sign up event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSignUpSuccess",
    value: (function () {
      var _trackSignUpSuccess = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(eventParams) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SIGN_UP_SUCCESS, eventParams);
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function trackSignUpSuccess(_x3) {
        return _trackSignUpSuccess.apply(this, arguments);
      }
      return trackSignUpSuccess;
    }()
    /**
     * @method trackSignUpFailed
     * @description This method logs a failed sign up event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSignUpFailed",
    value: (function () {
      var _trackSignUpFailed = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(eventParams) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SIGN_UP_FAILED, eventParams);
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function trackSignUpFailed(_x4) {
        return _trackSignUpFailed.apply(this, arguments);
      }
      return trackSignUpFailed;
    }()
    /**
     * @method trackLoginSuccess
     * @description This method logs a successful login event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackLoginSuccess",
    value: (function () {
      var _trackLoginSuccess = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(eventParams) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].LOG_IN_SUCCESS, eventParams);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function trackLoginSuccess(_x5) {
        return _trackLoginSuccess.apply(this, arguments);
      }
      return trackLoginSuccess;
    }()
    /**
     * @method trackLogoutSuccess
     * @description This method logs a successful logout event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackLogoutSuccess",
    value: (function () {
      var _trackLogoutSuccess = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(eventParams) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].LOG_OUT_SUCCESS, eventParams);
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function trackLogoutSuccess(_x6) {
        return _trackLogoutSuccess.apply(this, arguments);
      }
      return trackLogoutSuccess;
    }()
    /**
     * @method trackAppLaunched
     * @description This method logs an app launched event (cold start).
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackAppLaunched",
    value: (function () {
      var _trackAppLaunched = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(eventParams) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].APP_LAUNCHED, eventParams);
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function trackAppLaunched(_x7) {
        return _trackAppLaunched.apply(this, arguments);
      }
      return trackAppLaunched;
    }()
    /**
     * @method trackAppForegrounded
     * @description This method logs an app foregrounded event (warm start).
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackAppForegrounded",
    value: (function () {
      var _trackAppForegrounded = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(eventParams) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].APP_FOREGROUNDED, eventParams);
            case 2:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function trackAppForegrounded(_x8) {
        return _trackAppForegrounded.apply(this, arguments);
      }
      return trackAppForegrounded;
    }()
    /**
     * @method trackAppBackgrounded
     * @description This method logs an app backgrounded event (when the app goes to the background).
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackAppBackgrounded",
    value: (function () {
      var _trackAppBackgrounded = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(eventParams) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].APP_BACKGROUNDED, eventParams);
            case 2:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function trackAppBackgrounded(_x9) {
        return _trackAppBackgrounded.apply(this, arguments);
      }
      return trackAppBackgrounded;
    }()
    /**
     * @method trackChatMessageCreated
     * @description This method logs a chat message created event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackChatMessageCreated",
    value: (function () {
      var _trackChatMessageCreated = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(eventParams) {
        return _regeneratorRuntime().wrap(function _callee0$(_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              _context0.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].CHAT_MESSAGE_CREATED, eventParams);
            case 2:
            case "end":
              return _context0.stop();
          }
        }, _callee0, this);
      }));
      function trackChatMessageCreated(_x0) {
        return _trackChatMessageCreated.apply(this, arguments);
      }
      return trackChatMessageCreated;
    }()
    /**
     * @method trackChatMessageSent
     * @description This method logs a chat message sent event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackChatMessageSent",
    value: (function () {
      var _trackChatMessageSent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(eventParams) {
        return _regeneratorRuntime().wrap(function _callee1$(_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              _context1.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].CHAT_MESSAGE_SENT, eventParams);
            case 2:
            case "end":
              return _context1.stop();
          }
        }, _callee1, this);
      }));
      function trackChatMessageSent(_x1) {
        return _trackChatMessageSent.apply(this, arguments);
      }
      return trackChatMessageSent;
    }()
    /**
     * @method trackSubscribeClicked
     * @description This method logs a click or press to the subscribe button.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSubscribeClicked",
    value: (function () {
      var _trackSubscribeClicked = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(eventParams) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SUBSCRIBE_CLICKED, eventParams);
            case 2:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function trackSubscribeClicked(_x10) {
        return _trackSubscribeClicked.apply(this, arguments);
      }
      return trackSubscribeClicked;
    }()
    /**
     * @method trackSubscribeSuccess
     * @description This method logs a successful subscription event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSubscribeSuccess",
    value: (function () {
      var _trackSubscribeSuccess = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(eventParams) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SUBSCRIBE_SUCCESS, eventParams);
            case 2:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function trackSubscribeSuccess(_x11) {
        return _trackSubscribeSuccess.apply(this, arguments);
      }
      return trackSubscribeSuccess;
    }()
    /**
     * @method trackSubscribeFailed
     * @description This method logs a failed subscription event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSubscribeFailed",
    value: (function () {
      var _trackSubscribeFailed = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(eventParams) {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SUBSCRIBE_FAILED, eventParams);
            case 2:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function trackSubscribeFailed(_x12) {
        return _trackSubscribeFailed.apply(this, arguments);
      }
      return trackSubscribeFailed;
    }()
    /**
     * @method trackSubscriptionExpired
     * @description This method logs a subscription expired event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSubscriptionExpired",
    value: (function () {
      var _trackSubscriptionExpired = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(eventParams) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SUBSCRIPTION_EXPIRED, eventParams);
            case 2:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function trackSubscriptionExpired(_x13) {
        return _trackSubscriptionExpired.apply(this, arguments);
      }
      return trackSubscriptionExpired;
    }()
    /**
     * @method trackSearchSubmitted
     * @description This method logs a search submitted event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSearchSubmitted",
    value: (function () {
      var _trackSearchSubmitted = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(eventParams) {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SEARCH_SUBMITTED, eventParams);
            case 2:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function trackSearchSubmitted(_x14) {
        return _trackSearchSubmitted.apply(this, arguments);
      }
      return trackSearchSubmitted;
    }()
    /**
     * @method trackSearchResultClicked
     * @description This method logs a click or press to a search result.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSearchResultClicked",
    value: (function () {
      var _trackSearchResultClicked = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(eventParams) {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SEARCH_RESULT_CLICKED, eventParams);
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function trackSearchResultClicked(_x15) {
        return _trackSearchResultClicked.apply(this, arguments);
      }
      return trackSearchResultClicked;
    }()
    /**
     * @method trackSearchResultViewed
     * @description This method logs a search result viewed event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackSearchResultViewed",
    value: (function () {
      var _trackSearchResultViewed = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(eventParams) {
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].SEARCH_RESULT_VIEWED, eventParams);
            case 2:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function trackSearchResultViewed(_x16) {
        return _trackSearchResultViewed.apply(this, arguments);
      }
      return trackSearchResultViewed;
    }()
    /**
     * @method trackProfileViewed
     * @description This method logs a profile viewed event.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "trackProfileViewed",
    value: (function () {
      var _trackProfileViewed = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(eventParams) {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return this.firebaseAnalytics.logEvent(analytics, _events["default"].PROFILE_VIEWED, eventParams);
            case 2:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function trackProfileViewed(_x17) {
        return _trackProfileViewed.apply(this, arguments);
      }
      return trackProfileViewed;
    }()
    /**
     * @method setAnalyticsUserId
     * @description This method sets the user ID for analytics tracking.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "setAnalyticsUserId",
    value: (function () {
      var _setAnalyticsUserId = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(userId) {
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              console.log('setAnalyticsUserId: ', userId);
              _context18.next = 3;
              return setUserId(analytics, userId);
            case 3:
            case "end":
              return _context18.stop();
          }
        }, _callee18);
      }));
      function setAnalyticsUserId(_x18) {
        return _setAnalyticsUserId.apply(this, arguments);
      }
      return setAnalyticsUserId;
    }()
    /**
     * @method setAnalyticsUserProperties
     * @description This method sets user properties for analytics tracking.
     * @param eventParams - attributes to send to firebase analytics.
     * @returns  Promise<void>
     */
    )
  }, {
    key: "setAnalyticsUserProperties",
    value: (function () {
      var _setAnalyticsUserProperties = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(userProperties) {
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              console.log('setAnalyticsUserProperties: ', JSON.stringify(userProperties || {}, null, 2));
              _context19.next = 3;
              return setUserProperties(analytics, userProperties);
            case 3:
            case "end":
              return _context19.stop();
          }
        }, _callee19);
      }));
      function setAnalyticsUserProperties(_x19) {
        return _setAnalyticsUserProperties.apply(this, arguments);
      }
      return setAnalyticsUserProperties;
    }())
  }]);
}();
var _default = exports["default"] = FirebaseAnalyticsService;