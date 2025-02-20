import express from 'express';

const contenidoRouter = express.Router();

contenidoRouter.get('/normal', (req, res) => {
    let contenido = 'noPermisos';
    if (// TODO: condicion) {
        contenido = 'normal';
    }
    res.render('paginas/contenido', {
        contenido,
        session: req.session
    });
});

contenidoRouter.get('/admin', (req, res) => {
    // TODO: tu código aquí
});

export default contenidoRouter;