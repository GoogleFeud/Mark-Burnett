"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('regenerator-runtime');

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            saveChosen: null
        };
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            if (!saveChosen) {
                //
            } else {}
        }
    }, {
        key: "setSaveFile",
        value: function setSaveFile(file) {
            this.setState({ saveChosen: file });
        }
    }, {
        key: "get",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(endpoint) {
                var res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return fetch(endpoint);

                            case 2:
                                res = _context.sent;
                                return _context.abrupt("return", res.json());

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function get(_x) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
    }, {
        key: "post",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(endpoint, data) {
                var res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                Object.assign(data, { method: "POST" });
                                _context2.next = 3;
                                return fetch(endpoint, data);

                            case 3:
                                res = _context2.sent;
                                return _context2.abrupt("return", res.json());

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function post(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return post;
        }()
    }, {
        key: "delete",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(endpoint, data) {
                var res;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                Object.assign(data, { method: "DELETE" });
                                _context3.next = 3;
                                return fetch(endpoint, data);

                            case 3:
                                res = _context3.sent;
                                return _context3.abrupt("return", res.json());

                            case 5:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function _delete(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return _delete;
        }()
    }, {
        key: "patch",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(endpoint, data) {
                var res;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                Object.assign(data, { method: "PATCH" });
                                _context4.next = 3;
                                return fetch(endpoint, data);

                            case 3:
                                res = _context4.sent;
                                return _context4.abrupt("return", res.json());

                            case 5:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function patch(_x6, _x7) {
                return _ref4.apply(this, arguments);
            }

            return patch;
        }()
    }]);

    return App;
}(React.Component);

window.addEventListener("load", function () {
    console.log(1);
});