import { Usuario } from './Usuario.js';
import { render } from '../utils/render.js';
import { validationResult, matchedData } from 'express-validator';

export function viewLogin(req, res) {
    render(req, res, 'paginas/login', {
        datos: {},
        errores: {}
    });
}

export function viewHome(req, res) {
    return render(req, res, 'paginas/home');
}

export function doLogin(req, res) {
    // Capturo las variables username y password

    const result = validationResult(req);
    if (! result.isEmpty()) {
        const errores = result.mapped();
        const datos = matchedData(req);
        return render(req, res, 'paginas/login', {
            datos,
            errores
        });
    }
    const username = req.body.username;
    const password = req.body.password;

    try {
        const usuario = Usuario.login(username, password);
        req.session.login = true;
        req.session.nombre = usuario.nombre;
        req.session.rol = usuario.rol;

        // XXX Redirect a la página adecuada
        res.setFlash(`Encantado de verte de nuevo: ${usuario.username}`);
        return res.redirect('usuarios/home');

    } catch (e) {
        const datos = matchedData(req);
        render(req, res, 'paginas/login', {
            error: 'El usuario o contraseña no son válidos',
            datos,
            errores: {}
        });
    }
}

export function doLogout(req, res, next) {
    // https://expressjs.com/en/resources/middleware/session.html
    // logout logic

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.login = null
    req.session.nombre = null;
    req.session.rol = null;
    req.session.save((err) => {
        if (err) next(err);

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate((err) => {
            if (err) next(err)
            res.redirect('/');
        })
    })
}

export function viewRegistro(req, res) {
    render(req, res, 'paginas/registro', {
        datos: {},
        errores: {}
    });
}

export function doRegistro(req, res) {
    const result = validationResult(req);
    if (! result.isEmpty()) {
        const errores = result.mapped();
        const datos = matchedData(req);
        return render(req, res, 'paginas/registro', {
            datos,
            errores
        });
    }

    // Capturo las variables username y password
    const username = req.body.username;
    const password = req.body.password;
    const nombre = req.body.nombre;

    try {
        const usuario = Usuario.creaUsuario(username, password, nombre);
        req.session.login = true;
        req.session.nombre = usuario.nombre;
        req.session.rol = usuario.rol;

        return res.redirect('/usuarios/home');
    } catch (e) {
        render(req, res, 'paginas/registro', {
            error: 'No se ha podido crear el usuario',
            datos: {},
            errores: {}
        });
    }
}
