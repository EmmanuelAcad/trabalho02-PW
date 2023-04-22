const { pool } = require('../config')
const Jogo = require('../entities/jogo')

const getJogosDB = async () => {
    try {
        const { rows } = await
        pool.query('SELECT * FROM jogos ORDER BY codigo');
        return rows.map((jogo) => new Jogo(jogo.codigo, jogo.titulo,
            jogo.genero, jogo.preco, jogo.produtora));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addJogoDB = async (body) => {
    try {
        const { titulo, genero, preco, produtora } = body;
        const results = await pool.query(`INSERT INTO jogos (titulo, genero, preco, produtora)
                                                VALUES ($1, $2, $3, $4)
                                                RETURNING codigo, titulo, genero, preco, produtora`,
                                                [titulo, genero, preco, produtora]);
        const jogo = results.rows[0];

        return new Jogo(jogo.codigo, jogo.titulo, jogo.genero, jogo.preco, jogo.produtora);
    }catch (err) {
        throw "Erro: " + err;
    }
}

const updateJogoDB = async (body) => {
    try {
        const { codigo, titulo, genero, preco, produtora } = body;
        const results = await pool.query(`UPDATE jogos SET titulo = $1, genero = $2, preco = $3, produtora = $4
                                                WHERE codigo = $5
                                                RETURNING codigo, titulo, genero, preco, produtora`,
                                                [titulo, genero, preco, produtora, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const jogo = results.rows[0];

        return new Jogo(jogo.codigo, jogo.titulo, jogo.genero, jogo.preco, jogo.produtora);
    } catch (err) {
        throw "Erro ao inserir o Jogo: " + err;
    }
}

const deleteJogoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM jogos
                                                WHERE codigo = $1`,
                                                [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Jogo de código ${codigo} removido com sucesso`;
        }

    } catch (err) {
        throw "Erro ao remover o Jogo: " + err;
    }
}

const getJogoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM jogos
                                                WHERE codigo = $1`,
                                                [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const jogo = results.rows[0];
            return new Jogo(jogo.codigo, jogo.titulo, jogo.genero, jogo.preco, jogo.produtora);
        }

    } catch (err) {
        throw "Erro ao recuperar o Jogo: " + err;
    }
}

module.exports = { getJogosDB, addJogoDB, updateJogoDB, deleteJogoDB, getJogoPorCodigoDB }