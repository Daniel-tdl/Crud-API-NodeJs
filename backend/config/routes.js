module.exports = app => {
    app.route('/usuarios/login')
        .post(app.api.auth.login)

    app.route('/usuarios/store')
        .all(app.config.passaporte.authenticate())
        .post(app.api.usuario.salvar)

    app.route('/categorias/store')
        .all(app.config.passaporte.authenticate())
        .post(app.api.categorias.salvar)

    app.route('/categorias/update')
        .all(app.config.passaporte.authenticate())
        .post(app.api.categorias.salvar)

    app.route('/categorias/show/:id')
        .all(app.config.passaporte.authenticate())
        .get(app.api.categorias.buscarID)

    app.route('/categorias/index')
        .all(app.config.passaporte.authenticate())
        .get(app.api.categorias.buscar)

    app.route('/categorias/delete/:id')
        .all(app.config.passaporte.authenticate())
        .post(app.api.categorias.remover)

}

