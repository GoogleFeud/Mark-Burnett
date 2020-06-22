
const Default = require("../Defaults.js");

module.exports = class Tribe extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.name = data.name;
        this.color = data.color;
    }

    static default = {
        color: "black"
    }
}