


const Default = require("../Defaults.js");

class Location extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.saveId = data.saveId;
        this.name = data.name;
        this.limitedTo = data.limitedTo;
        this.staminaRequired = data.staminaRequired;
        this.password = data.password;
        this.text = data.text;
        this.inner = data.inner; // {"option": "text..."}
    }
    
}

Location.default =  {
    inner: {},
    staminaRequired: 1
}

module.exports = Location;