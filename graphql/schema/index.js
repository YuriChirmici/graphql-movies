const {
	GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLID,
	GraphQLList, GraphQLNonNull
} = require("graphql");

const Movie = require("../../database/models/Movie");
const Director = require("../../database/models/Director");

const MovieType = new GraphQLObjectType({
	name: "Movie",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: new GraphQLNonNull(GraphQLString) },
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
		name: { type: new GraphQLNonNull(GraphQLString) },
		age: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({ directorId: parent.id });
			}
		}
	})
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return Director.create(args);
			}
		},
		updateDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLString },
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return Director.findByIdAndUpdate(args.id, {
					name: args.name,
					age: args.age
				}, { new: true })
			}
		},
		deleteDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Director.findByIdAndRemove(args.id);
			}
		},
		addMovie: {
			type: MovieType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Movie.create(args);
			}
		},
		updateMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLString },
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				directorId: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Movie.findByIdAndUpdate(args.id, {
					name: args.name,
					genre: args.genre,
					directorId: args.directorId
				}, { new: true })
			}
		},
		deleteMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Movie.findByIdAndRemove(args.id);
			}
		},
	}
});

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
	query: Query,
	mutation: Mutation
})