

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



module.exports = {
    getFilesFromDir,
    rngBtw
}