


function sortArr(type, prop, arr = [], dataType = "string") {
    if (dataType === "string") {
        if (type === "asc") return arr.sort((a, b) => {
            return (a[prop] ? a[prop].toString():"").localeCompare(b[prop]);
        });
        return arr.sort((a, b) => {
            return (a[prop] ? a[prop].toString():"").localeCompare(b[prop]);
        }).reverse();
    }else if (dataType === "number") {
        if (type === "asc") return arr.sort((a, b) => a[prop] - b[prop]);
        return arr.sort((a, b) => b[prop] - a[prop]);
    }
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randomId() {
    return Math.random().toString(36).substr(2, 4);
}


export default {
    sortArr,
    randomRange,
    randomId
}