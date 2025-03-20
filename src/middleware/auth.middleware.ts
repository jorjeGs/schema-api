import { userAuth } from "../models/userAuth.interface";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import env from "../config/env.config";
import { formatRes } from "../utils/formats";

const authMiddleware = async (req: Request, res: Response, next: any) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json(formatRes('error', 'Unauthorized', 'Token is required', null))

        const token = (req.headers.authorization ?? '').split(" ")[1] as string

        if (token === '') return res.status(401).json(formatRes('error', 'Unauthorized', 'Token is empty', null))
        console.log(token)
        const USER = jwt.verify(token, env.secret, (err: any, decoded: any ) => {
            if (err !== null){ 
                console.log(env.secret)
                console.log(err);
                return null
            }
            return decoded as userAuth
        })

        if (USER == null) 
            return res.status(401).json(formatRes('error', 'Unauthorized', 'Invalid token', null))

        req.body.user = USER
        return next()
    } catch (error) {
        res.status(403).json(formatRes('error', 'Forbidden', 'Invalid token', null))
    }
}

export default authMiddleware;