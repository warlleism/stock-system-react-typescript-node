const Produtos = require('../model/produtos')

const read = async (req, res) => {

    var { tipo } = req.body

    try {
        const cadastro = await Produtos.findAll({ where: { tipo: tipo } })
        return res.status(200).send(cadastro);
    } catch (err) {
        return res.status(400).send({ error: 'Erro na listagem ' + err });
    }
}

module.exports = read;