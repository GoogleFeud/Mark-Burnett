
const Default = require("../Defaults.js");

class Tribe extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.name = data.name;
        this.color = data.color;
    }
}

Tribe.default = {
        color: "black"
}

module.exports = Tribe;