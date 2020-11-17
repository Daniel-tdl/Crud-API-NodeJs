const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { validarEmail, naoExisteOrErro, existeOrErro } = app.api.validacao

    const encriptarSenha = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const salvar = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({validacao: errors.array()})
        }

        const usuario = { ...req.body }
        if (req.params.id) usuario.id = req.params.id

        try {
            existeOrErro(usuario.nome, 'O nome do usuário é obrigatório')
            validarEmail(usuario.email, 'Email inválido!')
            
            console.log(usuario)
            const usuariodb = await app.db('Usuarios')
                .where({ email: usuario.email }).first()

            if (!usuario.id) {
                naoExisteOrErro(usuariodb, 'Usuário já cadastrado')
            }
        } catch (error) {
            return res.status(400).send(error)
        }

        usuario.senha = encriptarSenha(usuario.senha)
        
        if (usuario.id) {
            console.log('Aqui 1')
            app.db('Usuarios')
            .update(usuario).where({id: usuario.id})
            .then(_ => res.status(204).send(usuario))
            .catch(e => res.status(500).send(e))            
        } else {
            app.db('Usuarios')
            .insert(usuario)
            .then(_ => res.status(204).send(usuario))
            .catch(err => res.status(500).send(err)) 
        }
    }

    return {salvar}
}