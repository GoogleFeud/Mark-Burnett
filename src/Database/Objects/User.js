
const Default = require("../Defaults.js");

module.exports = class User extends Default.DefaultObject {
    constructor(collection, data) {
        super(collection, data);
        this.coins = data.coins;
        this.tickets = data.tickets;
        this.lastDaily = data.lastDaily;
        this.lastWeekly = data.lastWeekly;
        this.inventory = data.inventory;
        this.marriedTo = data.marriedTo;
        this.health = data.health;
        this.happiness = data.happiness;
        this.brains = data.brains;
        this.fame = data.fame;
    }

    plain() {
        return {
            _id: this.id,
            coins: this.coins,
            tickets: this.tickets,
            lastDaily: this.lastDaily,
            lastWeekly: this.lastWeekly,
            inventory: this.inventory,
            marriedTo: this.marriedTo,
            health: this.health, 
            happiness: this.happiness,
            brains: this.brains,
            fame: this.fame
        }
    }

}
