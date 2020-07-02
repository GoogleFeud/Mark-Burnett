"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contextMenu = require("./contextMenu");

var _contextMenu2 = _interopRequireDefault(_contextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//first: ascending (asc)
//second descending (des)
var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.state = {
            sort: []
        };
        return _this;
    }

    _createClass(Table, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var s = void 0;
            if (this.props.context) {
                s = this.props.cols.map(function (k, id) {
                    return React.createElement(_contextMenu2.default, { type: "td", show: k, props: {
                            scope: "col",
                            key: id,
                            onClick: function onClick() {
                                var typ = "asc";
                                if (_this2.state.sort[0] === k && _this2.state.sort[1] === "asc") typ = "des";
                                _this2.setState({ sort: [k, typ] });
                            }
                        }, tabs: _this2.props.context });
                });
            } else {
                s = this.props.cols.map(function (k, id) {
                    return React.createElement(
                        "td",
                        { scope: "col", key: id, onClick: function onClick() {
                                var typ = "asc";
                                if (_this2.state.sort[0] === k && _this2.state.sort[1] === "asc") typ = "des";
                                _this2.setState({ sort: [k, typ] });
                            } },
                        k
                    );
                });
            }
            if (this.props.addCol) s.push(React.createElement(
                "td",
                { scope: "col" },
                React.createElement("input", { defaultValue: "New", className: "inputCh", key: s.length + 1, onKeyUp: function onKeyUp(e) {
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            if (_this2.props.cols.includes(e.target.value)) return alert("Column already exists!");
                            _this2.props.addCol(e.target.value);
                        }
                    } })
            ));
            var p = this.props.body(this.state.sort);
            if (this.props.addRow) {
                p.push(React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { scope: "row", onClick: function onClick() {
                                _this2.props.addRow();
                            } },
                        "New"
                    )
                ));
            }
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "table",
                    { "class": "table table-striped table-bordered table-hover table-sm table-responsive" },
                    React.createElement(
                        "thead",
                        { "class": "thead-dark" },
                        React.createElement(
                            "tr",
                            null,
                            s
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        p
                    )
                )
            );
        }
    }]);

    return Table;
}(React.Component);

exports.default = Table;