const {body, validatorResult} = require('express-validator')

module.exports = app => {
    app.route('/usuarios')
        .post([
            body('nome').notEmpty().withMessage("O campo nome é obrigatório"),
            body('cpf').notEmpty().withMessage("O campo CPF é obrigatório")
        ], app.api.usuario.salvar)
}

