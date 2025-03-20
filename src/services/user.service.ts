import { RowDataPacket } from "mysql2";
import { User } from "../models/user.interface";
import { connectToDB } from "../config/db.config";
import { guardarLogError } from "../utils/logs";

export const getUserInfoService = async (id: number) => {
    try {
        const pool = await connectToDB();
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE id = ?`, 
            [id]
        );

        if ( rows.length === 0 ) {
            return null;
        }

        return rows[0] as User;
    } catch (error: any) {
        //guardar el error en un archivo de logs
        guardarLogError("Error en getUserInfoService: " + error.message);
        return null;
    }
}