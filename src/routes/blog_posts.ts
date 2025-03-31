import { Router } from "express";
import {getAllBlogPosts} from "@/controller/blog_posts.controller";
const blogPostRouter = Router();

blogPostRouter.get("/",getAllBlogPosts);

export default blogPostRouter;
