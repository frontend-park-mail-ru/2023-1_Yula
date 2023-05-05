export function lowerKeys(obj) {
    const keys = Object.keys(obj);
    const newKeys = keys.map(key => key[0].toLowerCase() + key.slice(1));
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
        newObj[newKeys[i]] = obj[keys[i]];
    }

    return newObj;
}

export function upperKeys(obj) {
    const keys = Object.keys(obj);
    const newKeys = keys.map(key => key[0].toUpperCase() + key.slice(1));
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
        newObj[newKeys[i]] = obj[keys[i]];
    }

    return newObj;
}
