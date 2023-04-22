const { pool } = require('../config')
const Produtora = require('../entities/produtora')

const getProdutorasDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM produtoras ORDER BY codigo');
        return rows.map((produtora) => new Produtora(produtora.codigo, produtora.nome,
            produtora.sede));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addProdutoraDB = async (body) => {
    try {
        const { nome, sede } = body;
        const results = await pool.query(`INSERT INTO produtoras (nome, sede)
                                                VALUES ($1, $2)
                                                RETURNING codigo, nome, sede`,
                                                [nome, sede]);
        const produtora = results.rows[0];

        return new Produtora(produtora.codigo, produtora.nome, produtora.sede);
    } catch (err) {
        throw "Erro ao inserir a produtora: " + err;
    }
}

const updateProdutoraDB = async (body) => {
    try {
        const { codigo, nome, sede } = body;
        const results = await pool.query(`UPDATE produtoras SET nome = $1, sede = $2
                                                WHERE codigo = $3
                                                RETURNING codigo, nome, sede`,
                                                [nome, sede, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const produtora = results.rows[0];

        return new Produtora(produtora.codigo, produtora.nome, produtora.sede);
    } catch (err) {
        throw "Erro ao atualizar a produtora: " + err;
    }
}

const deleteProdutoraDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM produtoras
                                                WHERE codigo = $1`,
                                                [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Produtora de código ${codigo} removida com sucesso`;
        }

    } catch (err) {
        throw "Erro ao remover a produtora: " + err;
    }
}

const getProdutoraPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM produtoras
                                                WHERE codigo = $1`,
                                                [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const produtora = results.rows[0];
            return new Produtora(produtora.codigo, produtora.nome, produtora.sede);
        }

    } catch (err) {
        throw "Erro ao recuperar a produtora: " + err;
    }
}

module.exports = { getProdutorasDB, addProdutoraDB, updateProdutoraDB, deleteProdutoraDB, getProdutoraPorCodigoDB }