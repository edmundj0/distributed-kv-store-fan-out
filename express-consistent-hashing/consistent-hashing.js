const crypto = require("crypto");

class ConsistentHashing {
    constructor(nodes) {
        this.nodes = nodes
    }

    // Calculate the hash value of a given key
    calculateHash(key) {
        const hash = crypto.createHash('md5');
        hash.update(key);
        return parseInt(hash.digest('hex'), 16);
    }

    // Find node responsible for given key using consistent hashing
    findNode(key) {
        const hash = this.calculateHash(key);
        const nodeIndex = hash % this.nodes.length;
        return this.nodes[nodeIndex]
    }
}
