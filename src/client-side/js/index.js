"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _saveEnter = require("./components/saveEnter");

var _saveEnter2 = _interopRequireDefault(_saveEnter);

var _dashboard = require("./components/dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        var save = localStorage.getItem("save");
        if (save) {
            _this.get("api/saves/" + save).then(function (saveFile) {
                if (saveFile.err) {
                    save = null;
                    _this.setState({ saveChosen: null });
                    window.alert(saveFile.err);
                } else {
                    _this.setState({ data: saveFile });
                }
            });
        }
        _this.state = {
            saveChosen: save,
            data: { players: [] }
        };
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            /**    const url = window.location.href.replace(window.location.port, "").replace(window.location.protocol, "ws")
               this.socket = new WebSocket(window.location.href.replace(/http|https/, "ws") + "ws");
               this.socket.onmessage = (data) => {
                       data = JSON.parse(data);
                       switch(data.e) {
                           case "playerUpdate": {
                              if (this.state.data.players.some(p => p.id === data.id)) this.setState(prev => {
                                  const p = prev.data.players.find(p => p.id === id);
                                  for (let key in data.c) {
                                      p[key] = data.c[key];
                                  }
                                  return prev;
                              });
                           }
                       }
              } **/
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.saveChosen) {
                return React.createElement(_saveEnter2.default, { app: this, data: this.state.data });
            } else {
                return React.createElement(_dashboard2.default, { app: this, data: this.state.data });
            }
        }
    }, {
        key: "setSaveFile",
        value: function setSaveFile(file) {
            localStorage.setItem("save", file.save.id);
            this.setState({ saveChosen: file.save, data: file });
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

                                if (res.ok) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return", { err: res.statusText });

                            case 5:
                                return _context.abrupt("return", res.json());

                            case 6:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(endpoint) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                Object.assign(data, { method: "POST" });
                                if (!data.headers) data.headers = { "Content-Type": "application/json" };
                                _context2.next = 4;
                                return fetch(endpoint, data);

                            case 4:
                                res = _context2.sent;

                                if (res.ok) {
                                    _context2.next = 7;
                                    break;
                                }

                                return _context2.abrupt("return", { err: res.statusText });

                            case 7:
                                return _context2.abrupt("return", res.json());

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function post(_x3) {
                return _ref2.apply(this, arguments);
            }

            return post;
        }()
    }, {
        key: "delete",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(endpoint) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var res;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                Object.assign(data, { method: "DELETE" });
                                if (!data.headers) data.headers = { "Content-Type": "application/json" };
                                _context3.next = 4;
                                return fetch(endpoint, data);

                            case 4:
                                res = _context3.sent;

                                if (res.ok) {
                                    _context3.next = 7;
                                    break;
                                }

                                return _context3.abrupt("return", { err: res.statusText });

                            case 7:
                                return _context3.abrupt("return", res.json());

                            case 8:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function _delete(_x5) {
                return _ref3.apply(this, arguments);
            }

            return _delete;
        }()
    }, {
        key: "patch",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(endpoint) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var res;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                Object.assign(data, { method: "PATCH" });
                                if (!data.headers) data.headers = { "Content-Type": "application/json" };
                                _context4.next = 4;
                                return fetch(endpoint, data);

                            case 4:
                                res = _context4.sent;

                                if (res.ok) {
                                    _context4.next = 7;
                                    break;
                                }

                                return _context4.abrupt("return", { err: res.statusText });

                            case 7:
                                return _context4.abrupt("return", res.json());

                            case 8:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function patch(_x7) {
                return _ref4.apply(this, arguments);
            }

            return patch;
        }()
    }, {
        key: "resolveValue",
        value: function resolveValue(val) {
            if (!isNaN(val)) return Number.parseFloat(val);
            if (val === "true") return true;
            if (val === "false") return false;
            if (val === "null" || val === "undefined") return null;
            return val.replace(/\s+/g, ' ').trim();
        }
    }, {
        key: "updatePlayer",
        value: function updatePlayer(id, key, value) {
            var internal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            value = this.resolveValue(value);
            this.setState(function (prev) {
                if (prev.data && prev.data.players && prev.data.players.some(function (p) {
                    return p.id === id;
                })) prev.data.players.find(function (p) {
                    return p.id === id;
                })[key] = value;
                return prev;
            });
            if (internal) return this.patch("/api/saves/" + this.state.saveChosen + "/players/" + id, { body: JSON.stringify(_defineProperty({}, key, value)) });
        }
    }, {
        key: "removeField",
        value: function removeField(collection, fieldName) {
            return this.delete("/api/saves/" + this.state.saveChosen + "/" + collection + "/" + fieldName);
        }
    }]);

    return App;
}(React.Component);

window.addEventListener("load", function () {
    ReactDOM.render(React.createElement(App, null), document.getElementById("main"));
});