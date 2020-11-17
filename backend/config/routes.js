module.exports = app => {
    app.route('/usuarios/login')
        .post(app.api.auth.login)

    app.route('/usuarios/store')
        .post(app.api.usuario.salvar)
}

