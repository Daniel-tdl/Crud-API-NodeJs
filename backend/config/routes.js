module.exports = app => {
    app.route('/usuarios/login')
        .post(app.api.auth.login)

    app.route('/usuarios/store')
        .all(app.config.passaporte.authenticate())
        .post(app.api.usuario.salvar)
}

