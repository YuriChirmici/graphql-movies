const { connect } = require("mongoose");

const user = "yuri";
const password = "2jpLOA4gnmxSNvGE";
const dbName = "graphql-test";
const uri = `mongodb+srv://${user}:${password}@` +
	`cluster0.e7xincx.mongodb.net/${dbName}?retryWrites=true&w=majority`

module.exports = {
	async connect() {
		await connect(uri);
		console.log("DB connected!");
	}
}