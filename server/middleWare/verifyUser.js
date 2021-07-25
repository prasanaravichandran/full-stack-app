// Verify the users for each API request
const { AuthenticationError } =  require('apollo-server');
const { verifyToken } = require('../helpers/jwtToken');

module.exports.verifyUser = ({ req }) => {
    if (req && req.body && req.body.operationName == 'UserLogIn') return true;
    const token = req.headers.authentication || '';
    const user = verifyToken(token);
    if (!user) throw new AuthenticationError('UNAUTHORIZED');
    return user;
};

