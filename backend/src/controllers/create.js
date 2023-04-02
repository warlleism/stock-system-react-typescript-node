const Produtos = require('../model/produtos')

const CreateUser = async (req, res) => {

    var { nome, preco, categoria, quantidade } = req.body

    const user = await Produtos.sequelize.query('SELECT codigo FROM produtos')
    let codigos = []
    user[0].map((e) => codigos.push(e.codigo))

    function gerarCodigoAleatorio() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        for (let i = 0; i < 5; i++) {
            codigo += caracteres.charAt(Math.random() * caracteres.length);
        }
        if (codigos.includes(codigo)) {
            gerarCodigoAleatorio()
        } else {
            return codigo
        }
    }

    var codigo = gerarCodigoAleatorio()

    try {
        const cadastrar = await Produtos.create({ nome, preco, categoria, codigo, quantidade })
        return res.status(200).send({ status: 200, sucess: 'Cadastro feito com sucesso', icon: 'success' });

    } catch (err) {
        res.status(400).send({ error: 'Algo deu errado! ' + err, icon: 'error' });
    }

}

module.exports = CreateUser