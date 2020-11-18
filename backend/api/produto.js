module.exports = app => {
    const { naoExisteOrErro, existeOrErro } = app.api.validacao

    const salvar = (req, res) => {
        const produto = { ...req.body }
        if (req.params.id) produto.id = req.params.id
       
        try {
            existeOrErro(produto.nome, 'O nome da produto é obrigatório')
        } catch (error) {
            return res.status(400).send(error)
        }

        if (produto.id) {
            app.db('Produtos')
            .update(produto).where({id: produto.id})
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send(e))            
        } else {
            app.db('Produtos')
            .insert(produto)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err)) 
        }
    }

    const buscarID = async (req, res) => {
        app.db('Produtos')
            .where({ id: req.params.id })
            .first()
            .then( prod => res.json(prod))
            .catch(err => res.status(500).send(err))
    }

    const limite = 10
    const buscar = async (req, res) => {
        const pagina = req.query.page || 1
        
        const registros = await app.db('Produtos').count('id').first()
        const count = parseInt(registros.count) 

        app.db('Produtos')
            .select('*')
            .limit(limite).offset(pagina * limite - limite)
            .then( produtos => res.json( {data: produtos, count, limite}))
            .catch(err => res.status(500).send(err))
    }

    const remover = async (req, res) => {
        try {
            existeOrErro(req.params.id, 'Informe o id da produto')
            const produtosDelete = await app.db('Produtos')
                .where({ id: req.params.id }).del()
            existeOrErro(produtosDelete, 'produto não encontrada.')
                 
            res.status(204).send()
        } catch (error) {
            return res.status(400).send(error)               
        }
    }

    return { salvar, buscarID, buscar, remover }
}