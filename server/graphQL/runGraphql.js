// Run GraphQl queries in the graphqlHTTP
const { graphqlHTTP } = require('express-graphql');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { errorResponseDetails } = require('../helpers/errorResponseDetails');
const { verifyUser } = require('../middleWare/verifyUser');

const errorResponse = (err) => {
    const error = {
        statusCode : errorResponseDetails[err.message].statusCode,
        message : errorResponseDetails[err.message].message
        // statusCode : err.message,
        // message : err.message
    };
    return error;
}

module.exports.runGraphQL = graphqlHTTP((req, res, graphQLParams) => {
    return {
        schema : typeDefs,
        rootValue: resolvers,
        graphiql:true,
        context: verifyUser({req}),
        customFormatErrorFn: errorResponse
    };
});