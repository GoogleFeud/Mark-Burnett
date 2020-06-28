
// Requires browserify + pkg
const child_process = require("child_process");

child_process.execSync("pkg . --out-path ./bin", (err) => {
    console.log(err);
});