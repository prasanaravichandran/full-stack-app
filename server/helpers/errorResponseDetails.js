// Constants for error response
exports.errorResponseDetails = {
    INVALID_CREDENTIALS: {
        message: 'Invalid Credentials',
        statusCode: 404
    },
    USER_ALREADY_EXISTS: {
      message: 'User is already exists',
      statusCode: 403
    },
    INTERNAL_SERVER_ERROR: {
      message: 'Internal Server error',
      statusCode: 500
    },
    TOKEN_EXPIRED: {
      message: 'User Token Expired',
      statusCode: 401
    }
};