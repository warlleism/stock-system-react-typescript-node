const Produtos = require('../model/produtos')

const readAll = async (req, res) => {

    try {
        const cadastro = await Produtos.findAll()
        return res.status(200).send(cadastro);
    } catch (err) {
        return res.status(400).send({ error: 'Erro na listagem ' + err });
    }
}

module.exports = readAll;