import { body, validationResult } from 'express-validator';

export function viewLogin(req, res) {
    res.render('pagina', {
        contenido: 'paginas/login',
        session: req.session,
        error: null //En un principio no tenemos error.
    });
}

export function doLogin(req, res) {
    body('nombre').escape(); // Se asegura que eliminar caracteres problemáticos
    body('password').escape(); // Se asegura que eliminar caracteres problemáticos

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        res.render('pagina', {
            contenido: 'paginas/login',
            session: req.session,
            error: errores.array()[0].msg
        });
    }
    const { nombre, password } = req.body;

    //Cuentas de usuario y administrador
    const user = { username: 'user', password: 'userpass' }; // Ejemplo de datos
    const admin = { username: 'useradmin', password: 'adminpass'};

    //Comprobamos si la contraseña coincide con el usuario
    if (nombre === user.username && password === user.password) {
        req.session.nombre = user.username;
        req.session.esAdmin = false;
        req.session.login = true;
        res.redirect('/contenido/normal');
    }
    else if (nombre === admin.username && password === admin.password){
        req.session.nombre = admin.username;
        req.session.esAdmin = true;
        req.session.login = true;
        res.redirect('/contenido/normal');
    }
    else {
        // Si la contraseña o el nombre es incorrecto, mostramos el error
        res.render('pagina', {
            contenido: 'paginas/login',
            session: req.session,
            error: 'Nombre de usuario o contraseña incorrectos'
        });
    }
}

export function doLogout(req, res, next) {
    //Eliminar los datos de la sesion con delete
    delete req.session.login;
    delete req.session.nombre;
    if (req.session.esAdmin) {
        delete req.session.esAdmin;
    }

    res.redirect('/contenido/normal');
}
