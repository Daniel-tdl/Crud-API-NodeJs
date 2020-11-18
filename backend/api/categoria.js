module.exports = app => {
    const { naoExisteOrErro, existeOrErro } = app.api.validacao

    const salvar = (req, res) => {
        const categoria = { ...req.body }
        if (req.params.id) categoria.id = req.params.id
       
        try {
            existeOrErro(categoria.nome, 'O nome da categoria é obrigatório')
        } catch (error) {
            return res.status(400).send(error)
        }

        if (categoria.id) {
            app.db('Categorias')
            .update(categoria).where({id: categoria.id})
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send(e))            
        } else {
            app.db('Categorias')
            .insert(categoria)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err)) 
        }
    }

    const buscarID = async (req, res) => {
        app.db('Categorias')
            .where({ id: req.params.id })
            .first()
            .then( cat => res.json(cat))
            .catch(err => res.status(500).send(err))
    }

    const limite = 10
    const buscar = async (req, res) => {
        const pagina = req.query.page || 1
        
        const registros = await app.db('Categorias').count('id').first()
        const count = parseInt(registros.count) 

        app.db('Categorias')
            .select('*')
            .limit(limite).offset(pagina * limite - limite)
            .then( cat => res.json( {data: cat, count, limite}))
            .catch(err => res.status(500).send(err))
    }

    const remover = async (req, res) => {
        try {
            existeOrErro(req.params.id, 'Informe o id da categoria')

            const produto = await app.db('Produtos')
                .where({ id: req.params.id })
            naoExisteOrErro(produto, 'Esta categorias possui produtos.')

            const categoriasDelete = await app.db('Categorias')
                .where({ id: req.params.id }).del()
            existeOrErro(categoriasDelete, 'Categoria não encontrada.')
                 
            res.status(204).send()
        } catch (error) {
            return res.status(400).send(error)               
        }
    }

    return { salvar, buscarID, buscar, remover }
}