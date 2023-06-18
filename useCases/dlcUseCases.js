const { pool } = require('../config');
const Dlc = require('../entities/dlc')

const getDlcsPorJogoDB = async (codigojogo) => {
    try {
        const results = await
            pool.query(`SELECT * FROM dlcs WHERE jogo = $1 
        ORDER BY codigo`, [codigojogo]);
        if (results.rowCount === 0) {
            throw `Nenhuma dlc encontrado com o código de 
            jogo: ${codigojogo}`;
        } else {
            return results.rows.map((dlc) =>
                new Dlc(dlc.codigo, dlc.titulo, dlc.descricao,
                    dlc.preco, dlc.jogo));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addDlcDB = async (body) => {
    try {
        const { titulo, descricao, preco, jogo } = body;
        const results = await pool.query(`INSERT INTO dlcs (titulo, descricao,
             preco, jogo) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, titulo, descricao, preco, jogo`,
            [titulo, descricao, preco, jogo]);
        const dlc = results.rows[0];
        return new Dlc(dlc.codigo, dlc.titulo, dlc.descricao,
            dlc.preco, dlc.jogo);
    } catch (err) {
        throw "Erro ao inserir a dlc: " + err;
    }
}

const updateDlcDB = async (body) => {
    try {
        const { codigo, titulo, descricao, preco, jogo } = body;
        const results = await pool.query(`UPDATE dlcs SET 
        titulo=$1, descricao=$2, preco=$3, jogo=$4 WHERE codigo=$5 
        RETURNING codigo, titulo, descricao, preco, jogo`,
            [titulo, descricao, preco, jogo, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const dlc = results.rows[0];
        return new Dlc(dlc.codigo, dlc.titulo, dlc.descricao,
            dlc.preco, dlc.jogo);
    } catch (err) {
        throw "Erro ao alterar a dlc: " + err;
    }
}

const deleteDlcDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM dlcs 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Dlc de código ${codigo} removida com sucesso!`
        }
    } catch (err) {
        throw "Erro ao remover a dlc: " + err;
    }
}

const getDlcPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM dlcs 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const dlc = results.rows[0];
            return new Dlc(dlc.codigo, dlc.titulo, dlc.descricao,
                dlc.preco, dlc.jogo);
        }
    } catch (err) {
        throw "Erro ao recuperar a dlc: " + err;
    }
}

module.exports = {
    getDlcsPorJogoDB, addDlcDB, updateDlcDB, 
    deleteDlcDB, getDlcPorCodigoDB
}