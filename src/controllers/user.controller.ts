import { User } from "../models/user.interface";
import { getUserInfoService } from "../services/user.service";
import { Request, Response } from "express";
import { formatRes } from "../utils/formats";


export const getUser = async (req: Request, res: Response) => {
    const { id } = req.body.user;
    
    const response: User | null = await getUserInfoService(id);

    if (response === null) {
        res.status(404).json(formatRes('error', 'Ocurrio un error', 'Usuario no encontrado', null));
        return;
    }

    res.status(200).json(formatRes('ok', 'Success', 'User found', {user: response}));
}