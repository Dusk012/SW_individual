import express from 'express';

const contenidoRouter = express.Router();

contenidoRouter.get('/normal', (req, res) => {
    let contenido = 'paginas/noPermisos';
    if (logged) {
        contenido = 'paginas/normal';
    }
    res.render('pagina', {
        contenido,
        session: req.session
    });
});

contenidoRouter.get('/admin', (req, res) => {
    // TODO: tu código aquí
});

export default contenidoRouter;