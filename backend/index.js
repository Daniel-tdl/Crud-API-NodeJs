const app = require('express')()
const consign = require('consign')
const knex = require('./config/db')

app.db = knex

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Servidor executando...')
})