const express = require("express");
const { graphqlMiddleware } = require("./graphql");

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/graphql", graphqlMiddleware());

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Server started on ${PORT}`))
	} catch (err) {
		console.log(err);
	}
}

start();