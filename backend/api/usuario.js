const { validationResult } = require('express-validator')

module.exports = app => {
    const salvar = (req, res) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.send({validacao: errors.array()})
        }

        return res.send('Foi salvo o usuário')
    }

    return {salvar}
}