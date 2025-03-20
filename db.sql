CREATE DATABASE cookio 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE cookio;

-- Configuración de la conexión para asegurar compatibilidad con caracteres especiales y emojis
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET SESSION collation_connection = 'utf8mb4_unicode_ci';

-- Borrar tablas si existen
DROP TABLE IF EXISTS roles;

-- TABLA DE ROLES (roles)
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- insert de roles
INSERT INTO roles (name, description) VALUES ('user', 'Usuario normal');
INSERT INTO roles (name, description) VALUES ('admin', 'Administrador');

-- Borrar tablas si existen
DROP TABLE IF EXISTS users;

-- TABLA DE USUARIOS (users)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    photo_url TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    id_role INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Agregar clave foránea a la tabla users
ALTER TABLE users ADD FOREIGN KEY (id_role) REFERENCES roles(id);

-- insert del usuario administrador
INSERT INTO users (email, username, name, password, id_role) VALUES ('root@test.com', 'root', 'Jorge', 'root', 2);

-- Borrar vistas si existen
DROP VIEW IF EXISTS view_users;

-- VIEW_USERS
CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `cookio`.`view_users` AS
select
    `u`.`id` AS `id`,
    `u`.`email` AS `email`,
    `u`.`username` AS `username`,
    `u`.`name` AS `name`,
    `u`.`password` AS `password`,
    `u`.`photo_url` AS `photo_url`,
    `u`.`id_role` AS `id_role`,
    `u`.`created_at` AS `created_at`,
    `u`.`updated_at` AS `updated_at`,
    `u`.`deleted_at` AS `deleted_at`,
    `r`.`name` AS `role`,
    `r`.`description` AS `description`
from
    (`cookio`.`users` `u`
join `cookio`.`roles` `r` on
    (`r`.`id` = `u`.`id_role`));