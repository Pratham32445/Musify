import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(404).json({
            message: "Token not found"
        })
        return;
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = user.Id;
    next();
}