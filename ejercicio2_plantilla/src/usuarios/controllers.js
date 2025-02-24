import { body } from 'express-validator';

export function viewLogin(req, res) {
    res.render('pagina', {
        contenido: 'paginas/login',
        session: req.session,
        error: ''
    });
}

export function doLogin(req, res) {
    // Aquí deberías implementar la autenticación con tu base de datos o sistema de usuarios.
    const { nombre, password } = req.body;
    body('username').escape(); // Se asegura que eliminar caracteres problemáticos
    body('password').escape(); // Se asegura que eliminar caracteres problemáticos

    // Simulamos la autenticación con datos duros
    const user = { username: 'user', password: 'userpass' }; // Ejemplo de datos
    const admin = { username: 'useradmin', password: 'adminpass'};

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
        // Si las credenciales son incorrectas, mostramos el error
        res.render('pagina', {
            contenido: 'paginas/login',
            session: req.session,
            error: 'Nombre de usuario o contraseña incorrectos'
        });
    }
}

export function doLogout(req, res, next) {
    
}
