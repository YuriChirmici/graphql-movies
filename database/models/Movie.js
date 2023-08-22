const { Schema, model } = require("mongoose");

const Movie = new Schema({
	name: { type: String, required: true },
	genre: { type: String, required: true },
	directorId: { type: String, required: true },
});

module.exports = model("movie", Movie);