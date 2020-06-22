
const Default = require("../Defaults.js");

module.exports = class User extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.saveId = data.saveId;
        this.tribe = data.tribe;
        this.stamina = data.stamina || 0;
        this.currentLocationId = data.currentLocationId;
        this.lastLocationId = data.lastLocationId;
    }


    static default = {
        stamina: 0
    }
    
}
