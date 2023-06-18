const { getDlcsPorJogoDB, addDlcDB, updateDlcDB, 
    deleteDlcDB, getDlcPorCodigoDB } = require('../useCases/dlcUseCases');
  
  const getDlcsPorJogo = async (request, response) => {
    await getDlcsPorJogoDB(request.params.codigojogo)
      .then(data => response.status(200).json(data))
      .catch(err => {
        response.status(400).json({
          status: 'error',
          message: 'Erro ao consultar as dlcs do jogo: ' + err
        })
      })
  }
  
  const addDlc = async (request, response) => {
    await addDlcDB(request.body)
      .then(data => response.status(200).json({
        status: "success", message: "Dlc criada",
        objeto: data
      }))
      .catch(err => response.status(400).json({
        status: "error", message: err
      }))
  }
  
  const updateDlc = async (request, response) => {
    await updateDlcDB(request.body)
      .then(data => response.status(200).json({
        status: "success", message: "Dlc alterada",
        objeto: data
      }))
      .catch(err => response.status(400).json({
        status: "error", message: err
      }))
  }
  
  const deleteDlc = async (request, response) => {
    await deleteDlcDB(request.params.codigo)
      .then(data => response.status(200).json({
        status: "success", message: data
      }))
      .catch(err => response.status(400).json({
        status: "error", message: err
      }))
  }
  
  const getDlcPorCodigo = async (request, response) => {
    await getDlcPorCodigoDB(request.params.codigo)
      .then(data => response.status(200).json(data))
      .catch(err => response.status(400).json({
        status: "error", message: err
      }))
  }
  
  module.exports = {
    getDlcsPorJogo, addDlc, updateDlc, 
    deleteDlc, getDlcPorCodigo
  }