
const Defaults = require("../Defaults.js");

module.exports = class Save extends Defaults.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.commandOptions = data.commandOptions;
    }

    static default = {
        commandOptions: {}
    }
}