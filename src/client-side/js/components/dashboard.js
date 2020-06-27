"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Dashboard;

var _Playerlist = require("./Playerlist");

var _Playerlist2 = _interopRequireDefault(_Playerlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dashboard(props) {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(_Playerlist2.default, { app: props.app, players: props.data.players }),
        React.createElement("hr", null)
    );
}