module.exports = app => {
    app.route('/usuarios/login')
        .post(app.api.auth.login)

    app.route('/usuarios/store')
        .all(app.config.passaporte.authenticate())
        .post(app.api.usuario.salvar)

    app.route('/categorias/store')
        .all(app.config.passaporte.authenticate())
        .post(app.api.categoria.salvar)

    app.route('/categorias/update')
        .all(app.config.passaporte.authenticate())
        .post(app.api.categoria.salvar)

    app.route('/categorias/show/:id')
        .all(app.config.passaporte.authenticate())
        .get(app.api.categoria.buscarID)

    app.route('/categorias/index')
        .all(app.config.passaporte.authenticate())
        .get(app.api.categoria.buscar)

    app.route('/categorias/delete/:id')
        .all(app.config.passaporte.authenticate())
        .post(app.api.categoria.remover)
    
        app.route('/produtos/store')
        .all(app.config.passaporte.authenticate())
        .post(app.api.produto.salvar)

    app.route('/produtos/update')
        .all(app.config.passaporte.authenticate())
        .post(app.api.produto.salvar)

    app.route('/produtos/show/:id')
        .all(app.config.passaporte.authenticate())
        .get(app.api.produto.buscarID)

    app.route('/produtos/index')
        .all(app.config.passaporte.authenticate())
        .get(app.api.produto.buscar)

    app.route('/produtos/delete/:id')
        .all(app.config.passaporte.authenticate())
        .post(app.api.produto.remover)
}

