
const Default = require("../Defaults.js");

class User extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.saveId = data.saveId;
        this.tribe = data.tribe;
        this.name = data.name;
        this.stamina = data.stamina || 0;
        this.currentLocationId = data.currentLocationId;
        this.lastLocationId = data.lastLocationId;
    }

    
}

User.default = {
    stamina: 0
}

module.exports = User;
