import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: statusCode === 500 ? "Internal server error" : err.message,
    });
};
