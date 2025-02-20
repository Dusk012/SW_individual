import { body } from 'express-validator';

export function viewLogin(req, res) {
    // TODO: tu código aquí
}

export function doLogin(req, res) {
    body('username').escape(); // Se asegura que eliminar caracteres problemáticos
    body('password').escape(); // Se asegura que eliminar caracteres problemáticos
    // TODO: tu código aquí
}

export function doLogout(req, res, next) {
    // TODO: https://expressjs.com/en/resources/middleware/session.html
}
