const { Router } = require('express');

const { getProdutoras, addProdutora, updateProdutora, deleteProdutora, getProdutoraPorCodigo } = require('../controllers/produtorasController')
const { getJogos, addJogo, updateJogo, deleteJogo, getJogoPorCodigo } = require('../controllers/jogosController')

const rotas = new Router();

rotas.route('/produtoras')
     .get(getProdutoras)
     .post(addProdutora)
     .put(updateProdutora);

rotas.route('/produtoras/:codigo')
     .get(getProdutoraPorCodigo)
     .delete(deleteProdutora);


rotas.route('/jogos')
     .get(getJogos)
     .post(addJogo)
     .put(updateJogo);

rotas.route('/jogos/:codigo')
     .get(getJogoPorCodigo)
     .delete(deleteJogo);

module.exports = rotas;
