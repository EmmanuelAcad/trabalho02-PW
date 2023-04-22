const { getJogosDB, addJogoDB, updateJogoDB, deleteJogoDB, getJogoPorCodigoDB } = require('../useCases/jogoUseCases');

const getJogos = async (request, response) => {
    await getJogosDB()
            .then(data => response.status(200).json(data))
            .catch(err => {
                response.status(400).json({
                    status : "error",
                    message : "Erro ao consultar os jogos " + err
                })
            })
}

const addJogo = async (request, response) => {
    await addJogoDB(request.body)
            .then(data => response.status(200).json({
                status : "success",
                message : "Jogo criado",
                objeto : data
            }))
            .catch(err => response.status(400).json({
                    status : "error",
                    message : err
                }))
}

const updateJogo = async (request, response) => {
    await updateJogoDB(request.body)
            .then(data => response.status(200).json({
                status : "success",
                message : "Jogo alterado",
                objeto : data
            }))
            .catch(err => response.status(400).json({
                status : "error",
                message : err
            }))
}

const deleteJogo = async (request, response) => {
    await deleteJogoDB(request.params.codigo)
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400).json({
                status : "error",
                message : err
            }))
}

const getJogoPorCodigo = async (request, response) => {
    await getJogoPorCodigoDB(request.params.codigo)
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400).json({
                status : "error",
                message : err
            }))
}

module.exports = { getJogos, addJogo, updateJogo, deleteJogo, getJogoPorCodigo }