const Formulario = require('../model/produtos')


const updateData = async (req, res) => {

    var { id, nome, preco, categoria, descricao, imagem, tipo } = req.body

    try {

        const formulario = await Formulario.update({ nome, preco, categoria, descricao, imagem, tipo }, { where: { id: id } })

        return res.status(200).send({ status: 200, sucess: 'Editado com sucesso', icon: 'success' });


    } catch (err) {
        res.status(400).send({ error: 'Algo deu errado! ' + err, icon: 'error' });
    }

}

module.exports = updateData