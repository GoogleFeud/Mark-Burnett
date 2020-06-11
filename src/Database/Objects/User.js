
const Default = require("../Defaults.js");

module.exports = class User extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.coins = data.coins;
        this.gold = data.gold;
        this.lastDaily = data.lastDaily;
        this.lastWeekly = data.lastWeekly;
        this.inventory = data.inventory;
    }

    plain() {
        return {
            id: this.id,
            coins: this.coins,
            lastDaily: this.lastDaily,
            lastWeekly: this.lastWeekly,
            inventory: this.inventory
        }
    }

}
