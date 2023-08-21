const {
	GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID
} = require("graphql");

const { movies } = require("./test-data");

const MovieType = new GraphQLObjectType({
	name: "Movie",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	})
});

const Query = new GraphQLObjectType({
	name: "Query",
	fields: {
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return movies.find((movie) => movie.id == id)
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: Query
})