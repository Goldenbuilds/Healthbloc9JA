const crypto = require('crypto');

function generateNonce(length) {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = generateNonce;
