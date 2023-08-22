const express = require("express");
const { graphqlMiddleware } = require("./graphql");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/graphql", graphqlMiddleware());

app.get("/", (req, res) => {
	res.redirect("/graphql");
});

const start = async () => {
	try {
		await db.connect();
		app.listen(PORT, () => console.log(`Server started on ${PORT}`))
	} catch (err) {
		console.log(err);
	}
}

start();