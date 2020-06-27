

const fs = require("fs");

function getFilesFromDir(dir, folderName) {
    const things = fs.readdirSync(dir);
    const files = [];
    for (let thing of things) {
        thing = `/${thing}`;
        const stats = fs.statSync(dir + thing);
        if (stats.isDirectory()) files.push(...getFilesFromDir(dir + thing, (folderName) ? folderName + thing:thing));
        else files.push((folderName) ? folderName + thing:thing)
    }
    return files;
}

function rngBtw(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function rngId(length = 3) {
    let str = "";
    for (let i=0; i < length; i++) {
        str + rngBtw(1, 9);
    }
    return str;
}

class Bitfield {
    constructor(...bits) {
        this.bits = bits.reduce((a, b) => a | b, 0);
    }

    add(...bits) {
        this.bits += bits.reduce((a, b) => a | b, 0);
    }

    get(pos) {
        return (this.bits & (1 << pos)) 
    }

}

module.exports = {
    getFilesFromDir,
    rngBtw,
    Bitfield,
    rngId
}