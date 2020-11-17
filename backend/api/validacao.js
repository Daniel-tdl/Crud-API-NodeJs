var validator = require("email-validator")

module.exports = app => {
    function existeOrErro(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length == 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }
    
    function naoExisteOrErro(value, msg) {
        try {
            existeOrErro(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    } 
    
    function dataFabricacaoMaiorDataValidade(dataFabricacao, dataValidade, msg) {
        return nil
    }

    function validarEmail(email, msg) {
        if (typeof email === 'string' && !email.trim()) throw msg
        if (!validator.validate(email)) throw msg 
    }

    return { validarEmail, dataFabricacaoMaiorDataValidade, naoExisteOrErro, existeOrErro }
}