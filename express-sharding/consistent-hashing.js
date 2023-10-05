const crypto = require("crypto");

// Calculate the hash value of a given key
function calculateHash(key) {
    const hash = crypto.createHash('md5');
    hash.update(key);
    return parseInt(hash.digest('hex'), 16);
}

// Find node responsible for given key using consistent hashing
function findNode(hash, nodes) {
    const nodeIndex = hash % nodes.length;
    return nodeIndex
}

module.exports = { calculateHash, findNode }
