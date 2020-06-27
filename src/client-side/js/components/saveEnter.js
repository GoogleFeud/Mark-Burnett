"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaveEnter = function (_React$Component) {
    _inherits(SaveEnter, _React$Component);

    function SaveEnter(props) {
        _classCallCheck(this, SaveEnter);

        var _this = _possibleConstructorReturn(this, (SaveEnter.__proto__ || Object.getPrototypeOf(SaveEnter)).call(this, props));

        _this.state = {
            error: ""
        };
        _this.input = "";
        return _this;
    }

    _createClass(SaveEnter, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "saveBod" },
                React.createElement("img", { src: "./logo.png", className: "survivorLogo" }),
                React.createElement("br", null),
                React.createElement(
                    "span",
                    null,
                    "Save ID:  "
                ),
                " ",
                React.createElement("input", { type: "text", placeholder: "ID here...", onInput: function onInput(e) {
                        _this2.err("");
                        _this2.input = e.target.value;
                    } }),
                React.createElement(
                    "button",
                    { onClick: _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var save;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.next = 2;
                                            return _this2.props.app.get("api/saves/" + _this2.input);

                                        case 2:
                                            save = _context.sent;

                                            if (!save.err) {
                                                _context.next = 5;
                                                break;
                                            }

                                            return _context.abrupt("return", _this2.err(save.err));

                                        case 5:
                                            console.log(save);
                                            _this2.props.app.setSaveFile(save);

                                        case 7:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this2);
                        })) },
                    "Go"
                ),
                React.createElement(
                    "p",
                    { "class": "saveErr" },
                    this.state.error
                )
            );
        }
    }, {
        key: "err",
        value: function err(msg) {
            this.setState({ error: msg });
        }
    }]);

    return SaveEnter;
}(React.Component);

exports.default = SaveEnter;