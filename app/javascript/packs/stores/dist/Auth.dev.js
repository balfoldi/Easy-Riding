"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _mobx = require("mobx");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthStore =
/*#__PURE__*/
function () {
  function AuthStore() {
    var _this = this;

    _classCallCheck(this, AuthStore);

    this.user = null;
    this.error = null;
    this.validatesErrors = [];

    this.signup =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(email, password, passwordConfirmation, termsAccepted) {
        var body, response, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pair;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.validatesErrors = [];
                body = {
                  user: {
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation,
                    termsAccepted: termsAccepted
                  }
                };
                _context.prev = 2;
                _context.next = 5;
                return fetch('/api/signup', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                });

              case 5:
                response = _context.sent;
                _context.next = 8;
                return response.json();

              case 8:
                data = _context.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 12;

                for (_iterator = response.headers.entries()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  pair = _step.value;

                  if (pair[0] === "authorization") {
                    _jsCookie["default"].set("EasyRidingUserToken", pair[1].split(' ')[1]);
                  }
                }

                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](12);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
                if (!data.errors) {
                  _context.next = 31;
                  break;
                }

                (0, _mobx.runInAction)(function () {
                  data.errors.map(function (error) {
                    _this.validatesErrors.push(error.detail);
                  });
                });
                throw new Error("Erreur: ".concat(data.errors));

              case 31:
                (0, _mobx.runInAction)(function () {
                  _this.user = data;
                });
                _context.next = 37;
                break;

              case 34:
                _context.prev = 34;
                _context.t1 = _context["catch"](2);
                (0, _mobx.runInAction)(function () {
                  _this.error = _context.t1.message;
                });

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 34], [12, 16, 20, 28], [21,, 23, 27]]);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();

    this.login =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(email, password) {
        var body, response, data, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pair;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.error = null;
                body = {
                  user: {
                    email: email,
                    password: password
                  }
                };
                _context2.prev = 2;
                _context2.next = 5;
                return fetch('/api/login', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                });

              case 5:
                response = _context2.sent;
                _context2.next = 8;
                return response.json();

              case 8:
                data = _context2.sent;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 12;

                for (_iterator2 = response.headers.entries()[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  pair = _step2.value;

                  if (pair[0] === "authorization") {
                    _jsCookie["default"].set("EasyRidingUserToken", pair[1].split(' ')[1]);
                  }
                }

                _context2.next = 20;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](12);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 20:
                _context2.prev = 20;
                _context2.prev = 21;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 23:
                _context2.prev = 23;

                if (!_didIteratorError2) {
                  _context2.next = 26;
                  break;
                }

                throw _iteratorError2;

              case 26:
                return _context2.finish(23);

              case 27:
                return _context2.finish(20);

              case 28:
                if (!data.error) {
                  _context2.next = 30;
                  break;
                }

                throw new Error(data.error);

              case 30:
                (0, _mobx.runInAction)(function () {
                  _this.user = data;
                });
                _context2.next = 36;
                break;

              case 33:
                _context2.prev = 33;
                _context2.t1 = _context2["catch"](2);
                (0, _mobx.runInAction)(function () {
                  _this.error = _context2.t1.message;
                });

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 33], [12, 16, 20, 28], [21,, 23, 27]]);
      }));

      return function (_x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.logout =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var userToken;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.error = null;
              userToken = _jsCookie["default"].get("EasyRidingUserToken");
              _context3.prev = 2;
              _context3.next = 5;
              return fetch('/api/logout', {
                method: 'DELETE',
                headers: {
                  'Authorization': "Bearer ".concat(userToken)
                }
              });

            case 5:
              _jsCookie["default"].remove("EasyRidingUserToken");

              (0, _mobx.runInAction)(function () {
                _this.user = null;
              });
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              (0, _mobx.runInAction)(function () {
                _this.error = _context3.t0.message;
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 9]]);
    }));

    this.autoLogin =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(userId, userToken) {
        var response, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.error = null;
                _context4.prev = 1;
                _context4.next = 4;
                return fetch("/api/users/".concat(userId), {
                  method: 'get',
                  headers: {
                    'Authorization': "Bearer ".concat(userToken)
                  }
                });

              case 4:
                response = _context4.sent;
                _context4.next = 7;
                return response.json();

              case 7:
                data = _context4.sent;

                if (!data.error) {
                  _context4.next = 10;
                  break;
                }

                throw new Error(data.error);

              case 10:
                (0, _mobx.runInAction)(function () {
                  _this.user = data;
                });
                _context4.next = 16;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](1);
                console.warn("The token is revoked, please login again");

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 13]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }();

    (0, _mobx.makeObservable)(this, {
      user: _mobx.observable,
      error: _mobx.observable,
      validatesErrors: _mobx.observable,
      isLogged: _mobx.computed,
      signup: _mobx.action,
      login: _mobx.action,
      logout: _mobx.action,
      autoLogin: _mobx.action,
      userID: _mobx.computed
    });
  }

  _createClass(AuthStore, [{
    key: "userID",
    get: function get() {
      var userToken = _jsCookie["default"].get("EasyRidingUserToken");

      return userToken ? (0, _jwtDecode["default"])(userToken).sub : null;
    }
  }, {
    key: "isLogged",
    get: function get() {
      var _this$user;

      var userToken = _jsCookie["default"].get("EasyRidingUserToken");

      return !!((_this$user = this.user) !== null && _this$user !== void 0 && _this$user.id) || !!userToken;
    }
  }]);

  return AuthStore;
}();

var _default = new AuthStore();

exports["default"] = _default;