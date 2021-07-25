const { userSchema } = require('../../models/users');
const { generateToken } = require('../../helpers/jwtToken');

// Check the users and authenticate it
module.exports = ({user_name, password}) => new Promise((resolve, reject) => {
    userSchema.find({ 'user_name': `${user_name}`,  'password': `${password}`})
    .then((response) => {
        if (response && response[0]) {
            response[0]['user_token'] = generateToken({user_name, password});
            resolve(response[0]);
        } else {
            reject(new Error('INVALID_CREDENTIALS'));
        }
    })
    .catch((e) => {
        reject(new Error('INTERNAL_SERVER_ERROR'));
    });
});