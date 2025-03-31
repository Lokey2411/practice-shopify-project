import express from "express";
import routers from "./router";
import { PREFIX_PATH } from "./constants";
import app from "./app";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

routers.forEach((router) => {
	app.use(PREFIX_PATH + router.path, router.router);
});

app.listen(8000, () => {
	console.log("Server running on port 8000");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
