const { authSecret } = require('../.env')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')


module.exports = app => {
    const AuthSegredo = 'EscolherAMelhorFormaDeGuardarEsseSecret'

    const login = async (req, res) => {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const usuario = await app.db('Usuarios')
            .where({ email: req.body.email }).first()

        if (!usuario) return res.status(400).send('Usuário não encontrado!')

        const isIgual = bcrypt.compareSync(req.body.senha, usuario.senha)
        if(!isIgual) return res.status(401).send('Email/senha inválidos! ')

        const data = Math.floor(Date.now() / 1000)

        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            iat: data,
            exp: data + (60 * 20)       
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validarToken = async (req, res) => {
        const usuarioData = req.body || null
        try {
            if (usuarioData) {
                const token = jwt.decode(userData.token, authSecret)

                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (error) {
            //problema com o token
        }

        res.send(false)
    }

    return { login, validarToken }
}