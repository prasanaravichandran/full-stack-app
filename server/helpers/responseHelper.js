// Send response to the front end
const { respDetails } = require('./errorResponseDetails');

module.exports.sendResponse = (req, res, responseType ,data) => {
    const { statusCode , message } = respDetails[responseType];
    return res.status(statusCode).json({
        'message' : message,
        'data' : data
    });
}