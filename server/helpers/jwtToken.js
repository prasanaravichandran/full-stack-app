// Generate and verify the token for the users
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET;

module.exports.generateToken = (data) => {
    const token = jwt.sign(data, secret_key, { expiresIn: process.env.JWT_TOKEN_EXPIRE });
    return token;
}

module.exports.verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secret_key);
        return data;
    } catch (e) {
        return false;
    }
}