import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../models/user.interface";
import { connectToDB } from "../config/db.config";
import { guardarLogError } from "../utils/logs";

export const loginService = async (email: string, password: string) => {
    //first we need to check if the user exists in the database
    let result: string = "";
    try {
        const pool = await connectToDB();
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE email = ? AND password = ?`, 
            [email, password]
        );

        if ( rows.length === 0 ) {
            guardarLogError("Error en loginService(V1): Usuario no encontrado");
            result = "Usuario no encontrado";
            return result;
        }

        return rows[0] as User;
    } catch (error: any) {
        guardarLogError("Error en loginService(V1): " + error.message);
        result = "Error en el servidor";
        return result;
    }
}

export const usernameTakenService = async (username: string) => {
    try {
        const pool = await connectToDB();
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE username = ?`, 
            [username]
        );

        if ( rows.length === 0 ) {
            return false;
        }

        return true;
    } catch (error) {
        //guardar el error en un archivo de logs
        return null;
    }
}

export const emailTakenService = async (email: string) => {
    try {
        const pool = await connectToDB();
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE email = ?`, 
            [email]
        );

        if ( rows.length === 0 ) {
            return false;
        }

        return true;
    } catch (error) {
        //guardar el error en un archivo de logs
        return null;
    }
}

export const registerService = async (email: string, password: string, username: string) => {

    try {
        const pool = await connectToDB();
        const [response] = await pool.query<ResultSetHeader>(
            `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, 
            [email, password, username]
        );

        return response.affectedRows > 0;
    } catch (error: any) {
        //guardar el error en un archivo de logs
        guardarLogError("Error en registerService(V1): " + error.message);
        return null;
    }
}