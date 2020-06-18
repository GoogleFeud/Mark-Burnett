


const Default = require("../Defaults.js");

module.exports = class Guild extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.saveId = data.saveId;
    }

}