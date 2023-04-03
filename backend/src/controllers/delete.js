const Formulario = require('../model/produtos')

const deleteData = async (req, res) => {

    var { id } = req.body

    try {
        const formulario = await Formulario.destroy({ where: { id: id } })
        return res.status(200).send({ status: 200, sucess: 'Editado com sucesso', icon: 'success' });
    } catch (err) {
        res.status(400).send({ error: 'Algo deu errado! ' + err, icon: 'error' });
    }

}

module.exports = deleteData