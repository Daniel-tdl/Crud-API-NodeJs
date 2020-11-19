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

    function dataValidaOrErro(value, msg) {
        const data = new Date(value)
        if (isNaN(data) || (data.toString() === "Invalid Date"))    
            throw msg
    }

    function EhNumberOrErro(value, msg) {
        if (!value) throw msg
        if (typeof value !== 'number') throw msg 
    }

    function EhBolleanOrErro(value, msg) {
       const verdadeiro =  (value === true || value === false)
        if (!verdadeiro) throw msg
    }
    
    function dataFabricacaoMaiorDataValidade(dataFabricacao, dataValidade, msg) {
        const dataFab = new Date(dataFabricacao)
        const dataVal = new Date(dataValidade)
        if (dataFab > dataVal) throw msg
    }

    function validarEmail(email, msg) {
        if (typeof email === 'string' && !email.trim()) throw msg
        if (!validator.validate(email)) throw msg 
    }

    return { EhBolleanOrErro ,validarEmail, dataFabricacaoMaiorDataValidade, naoExisteOrErro, existeOrErro, EhNumberOrErro, dataValidaOrErro }
}