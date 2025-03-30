import express from "express";
import routers from "./router";
import { PREFIX_PATH } from "./constants";

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
