import { guardarLogError } from "../utils/logs";
import env from "./env.config"
import mysql from "mysql2/promise";

export const DBCONFIG = {
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.name,
    charset: 'utf8mb4',
    timezone: '-08:00', // Tijuana timezone
}

let pool: mysql.Pool | null = null;

// Create a new connection pool
export async function connectToDB(): Promise<mysql.Pool> {
    try {
        if (pool != null) {
            return pool;
        }

        pool = mysql.createPool(DBCONFIG);
    
        return pool;
    } catch (err: any) {
        guardarLogError("Error en connectToDB: " + err.message);
        process.exit(1); // Stop the process
    }
}