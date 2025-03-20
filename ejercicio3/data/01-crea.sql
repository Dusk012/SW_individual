--
-- Archivo generado con SQLiteStudio v3.4.4 el ju. mar. 20 09:25:37 2025
--
-- Codificación de texto usada: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabla: Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id       INTEGER NOT NULL,
    username TEXT    NOT NULL
                     UNIQUE,
    password TEXT    NOT NULL,
    rol      TEXT    NOT NULL
                     DEFAULT 'U'
                     CHECK (rol IN ('U', 'A') ),
    nombre   TEXT    NOT NULL,
    PRIMARY KEY (
        id AUTOINCREMENT
    )
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
