const { authSecret } = require('../.env')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportjwt

module.exports = app => {
    const params = {
        secrect: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('Usuarios').where({ id: payload.id })
            .first()
            .then(usuario => done(null, usuario ? { ...payload }: false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}