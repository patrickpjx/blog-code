function unique(arr) {
    return Array.from(new Set(arr));
}

function unique2(arr) {
    const seed = new Map()
    return arr.filter(a => !seed.has(a) && seed.set(a, 1));
}

module.exports = unique;