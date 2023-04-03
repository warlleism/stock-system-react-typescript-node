const Formulario = require('../model/produtos')


const updateData = async (req, res) => {

    var { id, nome, preco, categoria, quantidade, codigo } = req.body

    try {

        const formulario = await Formulario.update({ nome, preco, categoria, quantidade, codigo }, { where: { id: id } })

        return res.status(200).send({ status: 200, sucess: 'Editado com sucesso', icon: 'success' });


    } catch (err) {
        res.status(400).send({ error: 'Algo deu errado! ' + err, icon: 'error' });
    }

}

module.exports = updateData