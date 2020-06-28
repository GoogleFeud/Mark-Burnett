"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Table = require("./Table");

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Input(props) {
    return React.createElement("input", { defaultValue: props.value || " ", className: "inputCh", onBlur: function onBlur(e) {
            if (props.player[props._key] == e.target.value) return;
            props.update(props.player.id, props._key, e.target.value);
        } });
}

function Player(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "th",
            { scope: "row" },
            props.number
        ),
        props.allProps.map(function (key) {
            if (props.player[key] === null || props.player[key] === undefined) return React.createElement(
                "td",
                null,
                React.createElement(Input, { player: props.player, _key: key, key: props.player.id, update: props.update })
            );
            return React.createElement(
                "td",
                null,
                React.createElement(Input, { value: props.player[key], key: props.player.id, player: props.player, _key: key, update: props.update })
            );
        })
    );
}

var PlayerList = function (_React$Component) {
    _inherits(PlayerList, _React$Component);

    function PlayerList(props) {
        _classCallCheck(this, PlayerList);

        var _this = _possibleConstructorReturn(this, (PlayerList.__proto__ || Object.getPrototypeOf(PlayerList)).call(this, props));

        var allProps = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this.props.players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var player = _step.value;

                for (var key in player) {
                    if (key === "saveId") continue;
                    if (!allProps.includes(key)) allProps.push(key);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        _this.state = {
            cols: allProps,
            players: _this.props.players
        };

        return _this;
    }

    _createClass(PlayerList, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (prevProps.players.length !== this.props.players.length) {
                //deepCompareArrayOfSimilarObjects(prevProps.players, this.props.players)
                var _allProps = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.props.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var player = _step2.value;

                        for (var key in player) {
                            if (key === "saveId") continue;
                            if (!_allProps.includes(key)) _allProps.push(key);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                this.setState({ players: this.props.players, cols: _allProps });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "h",
                    { className: "header" },
                    "Players"
                ),
                React.createElement(
                    "button",
                    { className: "r-btn" },
                    "Random"
                ),
                React.createElement(_Table2.default, { context: [{ name: "Delete", action: function action(colName) {
                            _this2.props.app.removeField("players", colName);
                            _this2.setState(function (prev) {
                                prev.cols.splice(prev.cols.indexOf(colName), 1);
                                return prev;
                            });
                        } }], addCol: this.addCol.bind(this), cols: this.state.cols, body: function body(sort) {
                        if (!_this2.state.players.length) return [];
                        var sample = _this2.state.players[0][sort[0]];
                        if (!sort.length) return _this2.state.players.map(function (p, i) {
                            return React.createElement(Player, { allProps: _this2.state.cols, key: p.id, number: i + 1, player: p, update: _this2.update.bind(_this2) });
                        });
                        return sortArr(sort[1], sort[0], _this2.state.players, isNaN(sample) ? "string" : "number").map(function (p, i) {
                            return React.createElement(Player, { key: p.id, allProps: _this2.state.cols, number: i + 1, player: p, update: _this2.update.bind(_this2) });
                        });
                    } }),
                React.createElement(
                    "p",
                    { className: "smoll" },
                    "Create players using the bot on discord!"
                )
            );
        }
    }, {
        key: "update",
        value: function update(player, key, val) {
            this.props.app.updatePlayer(player, key, val);
        }
    }, {
        key: "addCol",
        value: function addCol(name) {
            this.setState(function (prev) {
                prev.cols.push(name);
                return prev;
            });
        }
    }]);

    return PlayerList;
}(React.Component);

exports.default = PlayerList;


function sortArr(type, prop) {
    var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var dataType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "string";

    if (dataType === "string") {
        if (type === "asc") return arr.sort(function (a, b) {
            return (a[prop] ? a[prop].toString() : "").localeCompare(b[prop]);
        });
        return arr.sort(function (a, b) {
            return (a[prop] ? a[prop].toString() : "").localeCompare(b[prop]);
        }).reverse();
    } else if (dataType === "number") {
        if (type === "asc") return arr.sort(function (a, b) {
            return a[prop] - b[prop];
        });
        return arr.sort(function (a, b) {
            return b[prop] - a[prop];
        });
    }
}

function deepCompareArrayOfSimilarObjects(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}