import blogPostRouter from "./blog_posts";
import userRouter from "./users.route";
const routers = [
	{
		path: "/users",
		router: userRouter,
	},
	{
		path: "/blog_posts",
		router: blogPostRouter,
	},
];
export default routers;
