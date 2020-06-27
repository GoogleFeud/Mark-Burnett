
start npx babel --watch ./src/client-side/jsx --out-dir ./src/client-side/js
start watchify ./src/client-side/js/index.js -o ./src/client-side/static/bundle.js 