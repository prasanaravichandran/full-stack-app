// Router file to route the endpoints
const { runGraphQL } = require('../graphQL/runGraphql');

const initialize = (app) => {
    app.use('/graphql', runGraphQL);
};

exports.initialize = initialize;