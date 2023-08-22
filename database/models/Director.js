const { Schema, model } = require("mongoose");

const Director = new Schema({
	name: { type: String, required: true },
	age: Number
});

module.exports = model("director", Director);