--
-- Archivo generado con SQLiteStudio v3.4.4 el ju. mar. 20 09:26:29 2025
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

INSERT INTO Usuarios (
                         id,
                         username,
                         password,
                         rol,
                         nombre
                     )
                     VALUES (
                         1,
                         'user',
                         '$2b$10$JdCg8yL3rRkkr.hhx1rjqOe30F9lhBlqA1sjYJW6ymzYExvQFHyjy',
                         'U',
                         'Usuario'
                     );

INSERT INTO Usuarios (
                         id,
                         username,
                         password,
                         rol,
                         nombre
                     )
                     VALUES (
                         2,
                         'admin',
                         '$2b$10$Htah5iG9eKj8ItIItpzK6uvny3c5/QjdZaLwwmFy32RPrfVspNgYS',
                         'A',
                         'Administrador'
                     );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
