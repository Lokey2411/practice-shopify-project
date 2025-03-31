const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	return res.json([
		{
			id: 1,
			username: "admin",
			password: "admin",
		},
	]);
});
export default userRouter;
