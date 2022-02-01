import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import 'dotenv';

export function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        response.status(401).json({
            message: "Not authorized"
        });
    }
    const token = authToken.split(' ')[1];

    try {
        verify(token, process.env.ACCESS_TOKEN_SECRET)
        return next();
    } catch (e) {
        return response.status(401).json({message: e.message});
    }
}
