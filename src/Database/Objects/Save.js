
const Default = require("../Defaults.js");

module.exports = class Save extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.commandOptions = data.commandOptions;
    }

    static default = {
        commandOptions: {}
    }
}