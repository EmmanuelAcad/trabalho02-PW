const { getProdutorasDB, addProdutoraDB, updateProdutoraDB, deleteProdutoraDB, getProdutoraPorCodigoDB } = require('../useCases/produtoraUseCases');

const getProdutoras = async (request, response) => {
    await getProdutorasDB()
          .then(data => response.status(200).json(data))
          .catch(err => {
            response.status(400).json({
                status : 'error',
                message : 'Erro ao consultar as produtoras: ' + err
            })
          })
}

const addProdutora = async (request, response) => {
  await addProdutoraDB(request.body)
          .then (data => response.status(200).json({
            status : "success",
            message : "Produtora criada",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error",
            message  : err
          }))
}

const updateProdutora = async (request, response) => {
  await updateProdutoraDB(request.body)
          .then (data => response.status(200).json({
            status : "success",
            message : "Produtora alterada",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error",
            message  : err
          }))
}

const deleteProdutora = async (request, response) => {
  await deleteProdutoraDB(request.params.codigo)
          .then (data => response.status(200).json({
            status : "success",
            message : data
          }))
          .catch(err => response.status(400).json({
            status : "error",
            message  : err
          }))
}

const getProdutoraPorCodigo = async (request, response) => {
  await getProdutoraPorCodigoDB(request.params.codigo)
          .then (data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : "error",
            message  : err
          }))
}



module.exports = { getProdutoras, addProdutora, updateProdutora, deleteProdutora, getProdutoraPorCodigo }