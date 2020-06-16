

module.exports = class Bitfield {
    constructor(...bits) {
        this.bits = 0;
        if (bits.length) this.add(...bits);
    }

    has(bit) {
        return this.bits & bit
    }

    add(...bits) {
        for (let bit of bits) this.bits |= bit;
    }

}