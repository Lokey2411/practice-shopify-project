import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "@config/db";
import routes from "@routes/index";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", routes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
});

export default app;
