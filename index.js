const express = require("express");

const app = express();
const PORT = process.env.PORT || 3005;

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Server started on ${PORT}`))
	} catch (err) {
		console.log(err);
	}
}

start();