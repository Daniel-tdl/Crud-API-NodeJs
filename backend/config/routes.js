const {body, validatorResult} = require('express-validator')

module.exports = app => {
    app.route('/usuarios')
        .post(app.api.usuario.salvar)
}

