import { Response, Request } from "express";
import { emailTakenService, loginService, registerService, usernameTakenService } from "../services/auth.service";
import jwt from 'jsonwebtoken';
import env from "../config/env.config";
import { User } from "../models/user.interface";
import { guardarLogInfo } from "../utils/logs";
import { formatRes } from "../utils/formats";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await loginService(email, password);

    if (typeof response === 'string') {
        res.status(200).json(formatRes('error', 'Ocurrio un error', response, null));
        return;
    }

    const user = response as User;

    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        env.secret,
        { expiresIn: '12h' }
    );

    //Gardar log del inicio de sesion
    guardarLogInfo(`Usuario ${user.email} ha iniciado sesion`);

    res.status(200).json(formatRes('ok', 'Success', 'User logged in', { token }) );
}

export const register = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    //first we need to check if the user exists in the database
    let usernameTaken = await usernameTakenService(username);

    if (usernameTaken) {
        res.status(200).json(formatRes('error', 'Ocurrio un error', 'El username ya existe', null));
        return;
    }

    let emailTaken = await emailTakenService(email);

    if (emailTaken) {
        res.status(200).json(formatRes('error', 'Ocurrio un error', 'El email ya existe', null));
        return;        
    }

    //if user is not in the database, then we can register the user
    const response = await registerService(email, password, username);

    if (response === null) {
        res.status(200).json(formatRes('error', 'Ocurrio un error', 'Error en el servidor', null));
        return;
    }

    //guardar log del registro
    guardarLogInfo(`Usuario ${email} ha sido registrado`);
    res.status(201).json(formatRes('ok', 'Success', 'Usuario registrado', null));
}