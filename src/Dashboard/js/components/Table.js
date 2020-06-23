"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table(props) {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));
    }

    _createClass(Table, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var s = this.props.cols.map(function (k) {
                return React.createElement(
                    "td",
                    { scope: "col" },
                    k
                );
            });
            s.push(React.createElement(
                "td",
                { scope: "col" },
                React.createElement("input", { defaultValue: "New", className: "inputCh", onKeyUp: function onKeyUp(e) {
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            _this2.props.addCol(e.target.value);
                        }
                    } })
            ));
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
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "#"
                            ),
                            s
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.props.body
                    )
                )
            );
        }
    }]);

    return Table;
}(React.Component);

exports.default = Table;