const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

module.exports.graphqlMiddleware = () => graphqlHTTP({
	schema,
	graphiql: true
})