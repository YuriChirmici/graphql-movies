const {
	GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLID,
	GraphQLList
} = require("graphql");

const Movie = require("../../database/models/Movie");
const Director = require("../../database/models/Director");

const MovieType = new GraphQLObjectType({
	name: "Movie",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		director: {
			type: DirectorType,
			resolve(parent, args) {
				return Director.findById(parent.directorId);
			}
		}
	})
});

const DirectorType = new GraphQLObjectType({
	name: "Director",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({ directorId: parent.id });
			}
		}
	})
})

const Query = new GraphQLObjectType({
	name: "Query",
	fields: {
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Movie.findById(args.id);
			}
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Director.findById(args.id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find();
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				return Director.find();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: Query
})