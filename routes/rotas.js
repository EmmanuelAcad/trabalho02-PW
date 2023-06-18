const { Router } = require("express");

const {
  getProdutoras,
  addProdutora,
  updateProdutora,
  deleteProdutora,
  getProdutoraPorCodigo,
} = require("../controllers/produtorasController");

const {
  getJogos,
  addJogo,
  updateJogo,
  deleteJogo,
  getJogoPorCodigo,
} = require("../controllers/jogosController");

const {
  getDlcsPorJogo,
  addDlc,
  updateDlc,
  deleteDlc,
  getDlcPorCodigo,
} = require("../controllers/dlcsController");

const { login , verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas
  .route('/login')
  .post(login);

rotas
  .route("/produtoras")
  .get(verificaJWT, getProdutoras)
  .post(verificaJWT, addProdutora)
  .put(verificaJWT, updateProdutora);

rotas
  .route("/produtoras/:codigo")
  .get(verificaJWT, getProdutoraPorCodigo)
  .delete(verificaJWT, deleteProdutora);

rotas
  .route("/jogos")
  .get(verificaJWT, getJogos)
  .post(verificaJWT, addJogo)
  .put(verificaJWT, updateJogo);

rotas
  .route("/jogos/:codigo")
  .get(verificaJWT, getJogoPorCodigo)
  .delete(verificaJWT, deleteJogo);

rotas
  .route("/dlcs/jogo/:codigojogo")
  .get(verificaJWT, getDlcsPorJogo);

rotas
  .route("/dlcs")
  .post(verificaJWT, addDlc)
  .put(verificaJWT, updateDlc);

rotas
  .route("/dlcs/:codigo")
  .get(verificaJWT, getDlcPorCodigo)
  .delete(verificaJWT, deleteDlc);

module.exports = rotas;
