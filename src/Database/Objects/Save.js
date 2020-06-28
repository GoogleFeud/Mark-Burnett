
const Defaults = require("../Defaults.js");

class Save extends Defaults.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.commandOptions = data.commandOptions;
    }

}

Save.default = {
    commandOptions: {} 
}

module.exports = Save;